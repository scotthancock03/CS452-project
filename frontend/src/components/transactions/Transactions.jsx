import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Paper, Table, TableHead, TableBody, TableCell, TableContainer,
  TableRow, TableSortLabel, TablePagination, Typography, Chip, IconButton,
  Tooltip, CircularProgress
} from '@mui/material';
import { Refresh as RefreshIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styles } from './Transactions.styles';
import { getTransactions, deleteTransaction } from '../services/api';

const COLUMNS = [
  { id: 'sku', label: 'SKU', defaultWidth: '15%' },
  { id: 'itemName', label: 'Item Name', defaultWidth: '30%' },
  { id: 'category', label: 'Category', defaultWidth: '18%' },
  { id: 'quantity', label: 'Quantity Change', align: 'center', defaultWidth: '15%' },
  { id: 'createdAt', label: 'Date & Time Recorded', defaultWidth: '14%' },
  { id: 'actions', label: 'Actions', align: 'center', sortable: false, defaultWidth: '8%' },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [colWidths, setColWidths] = useState(
    COLUMNS.reduce((acc, col) => ({ ...acc, [col.id]: col.defaultWidth }), {})
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const resizeRef = useRef({ startX: 0, startWidth: 0, colId: null });

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error('Failed to load transactions:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSort = (prop) => {
    setOrder(orderBy === prop && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  const handleMouseDown = (e, colId) => {
    e.stopPropagation();
    e.preventDefault();
    resizeRef.current = {
      startX: e.clientX,
      startWidth: e.currentTarget.parentElement?.offsetWidth || 100,
      colId,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const { startX, startWidth, colId } = resizeRef.current;
    if (!colId) return;
    const newWidth = Math.max(80, startWidth + (e.clientX - startX));
    setColWidths((prev) => ({ ...prev, [colId]: `${newWidth}px` }));
  };

  const handleMouseUp = () => {
    resizeRef.current.colId = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction record?')) return;
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aVal = a[orderBy];
    let bVal = b[orderBy];
    if (orderBy === 'createdAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (order === 'asc' ? 1 : -1);
  });

  return (
    <Paper elevation={0} sx={styles.paperContainer}>
      <Box sx={styles.headerBox}>
        <Typography variant="h5" component="h1" fontWeight={700} fontSize="1.25rem">
          Transaction History
        </Typography>
        <Tooltip title="Refresh History">
          <IconButton
            onClick={loadTransactions}
            sx={{
              height: 36,
              width: 36,
              color: '#1C2B46',
              '&:hover': { bgcolor: '#D0E1F9' },
            }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer sx={styles.tableContainer}>
            <Table stickyHeader sx={styles.table} size="small">
              <TableHead sx={styles.tableHeader}>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || 'left'}
                      sx={{ ...styles.tableHeaderCell, width: colWidths[col.id] }}
                    >
                      {col.sortable !== false ? (
                        <TableSortLabel
                          active={orderBy === col.id}
                          direction={orderBy === col.id ? order : 'asc'}
                          onClick={() => handleSort(col.id)}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                      {col.sortable !== false && (
                        <Box sx={styles.resizer} onMouseDown={(e) => handleMouseDown(e, col.id)} />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody sx={styles.tableBody}>
                {sortedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 2.5 }}>
                      <Typography color="text.secondary">No transactions recorded yet.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTransactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id} hover sx={styles.tableRow}>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1877F2' }}>
                          {row.sku}
                        </TableCell>
                        <TableCell>{row.itemName}</TableCell>
                        <TableCell>
                          <Chip label={row.category || 'General'} sx={styles.categoryChip} />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.quantity > 0 ? `+${row.quantity}` : row.quantity}
                            sx={styles.stockChip(row.quantity > 0)}
                          />
                        </TableCell>
                        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete Record">
                            <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={styles.paginationBar}
          />
        </>
      )}
    </Paper>
  );
}