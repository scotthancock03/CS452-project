import React, { useState, useRef } from 'react';
import {
  Box, Paper, Table, TableHead, TableBody, TableCell, TableContainer,
  TableRow, TableSortLabel, TablePagination, Typography, Chip, IconButton,
  Tooltip, CircularProgress
} from '@mui/material';
import { Refresh as RefreshIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styles } from './Transactions.styles';

const initialTransactions = [
  { id: 'TXN 1001', sku: 'MOU-101', itemName: 'Wireless Ergonomic Mouse', category: 'Electronics', quantity: 50, createdAt: new Date().toISOString() },
  { id: 'TXN 1002', sku: 'MOU-101', itemName: 'Wireless Ergonomic Mouse', category: 'Electronics', quantity: -2, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: 'TXN 1003', sku: 'KEY-202', itemName: 'Mechanical Gaming Keyboard', category: 'Electronics', quantity: 20, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'TXN 1004', sku: 'KEY-202', itemName: 'Mechanical Gaming Keyboard', category: 'Electronics', quantity: -1, createdAt: new Date(Date.now() - 5400000).toISOString() },
  { id: 'TXN 1005', sku: 'CHR-303', itemName: 'Office Chair', category: 'Furniture', quantity: 10, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'TXN 1006', sku: 'RAM-404', itemName: '32GB DDR5 RAM Kit', category: 'Electronics', quantity: 100, createdAt: new Date(Date.now() - 10800000).toISOString() },
  { id: 'TXN 1007', sku: 'RAM-404', itemName: '32GB DDR5 RAM Kit', category: 'Electronics', quantity: -4, createdAt: new Date(Date.now() - 12600000).toISOString() },
  { id: 'TXN 1008', sku: 'NTB-404', itemName: 'Notebook', category: 'Office Supplies', quantity: -1, createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: 'TXN 1009', sku: 'MON-909', itemName: '27-inch 4K Monitor', category: 'Electronics', quantity: 15, createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: 'TXN 1010', sku: 'SSD-201', itemName: 'External 1TB NVMe SSD', category: 'Electronics', quantity: 40, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'TXN 1011', sku: 'SSD-201', itemName: 'External 1TB NVMe SSD', category: 'Electronics', quantity: -10, createdAt: new Date(Date.now() - 88200000).toISOString() },
  { id: 'TXN 1012', sku: 'MOU-101', itemName: 'Wireless Ergonomic Mouse', category: 'Electronics', quantity: -5, createdAt: new Date(Date.now() - 90000000).toISOString() },
];

const COLUMNS = [
  { id: 'id', label: 'Txn ID', defaultWidth: '10%' },
  { id: 'sku', label: 'SKU', defaultWidth: '12%' },
  { id: 'itemName', label: 'Item Name', defaultWidth: '25%' },
  { id: 'category', label: 'Category', defaultWidth: '15%' },
  { id: 'quantity', label: 'Quantity', align: 'center', defaultWidth: '13%' },
  { id: 'createdAt', label: 'Date & Time Recorded', defaultWidth: '17%' },
  { id: 'actions', label: 'Actions', align: 'center', sortable: false, defaultWidth: '8%' },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [colWidths, setColWidths] = useState(
    COLUMNS.reduce((acc, col) => ({ ...acc, [col.id]: col.defaultWidth }), {})
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const resizeRef = useRef({ startX: 0, startWidth: 0, colId: null });

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
      await fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    } finally {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/transactions');
      setTransactions(await res.json());
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
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
            onClick={fetchTransactions}
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
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>
                          {row.id}
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1877F2' }}>
                          {row.sku}
                        </TableCell>
                        <TableCell>{row.itemName}</TableCell>
                        <TableCell>
                          <Chip label={row.category} sx={styles.categoryChip} />
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