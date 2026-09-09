import React, { useState, useRef } from 'react';
import {
  Box, Paper, Table, TableHead, TableBody, TableCell, TableContainer,
  TableRow, TableSortLabel, TablePagination, Typography, Chip, IconButton,
  Tooltip, CircularProgress
} from '@mui/material';
import { Refresh as RefreshIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styles } from './Transactions.styles';

const initialTransactions = [
  { id: 'TXN 1001', sku: 'MOUSE 101', itemName: 'Wireless Ergonomic Mouse', category: 'Accessories', quantity: 50, createdAt: new Date().toISOString() },
  { id: 'TXN 1002', sku: 'MOUSE 101', itemName: 'Wireless Ergonomic Mouse', category: 'Accessories', quantity: -2, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: 'TXN 1003', sku: 'KEYB 202', itemName: 'Mechanical Gaming Keyboard', category: 'Peripherals', quantity: 20, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'TXN 1004', sku: 'KEYB 202', itemName: 'Mechanical Gaming Keyboard', category: 'Peripherals', quantity: -1, createdAt: new Date(Date.now() - 5400000).toISOString() },
  { id: 'TXN 1005', sku: 'LAPT 303', itemName: '15 inch Ultra Laptop', category: 'Computers', quantity: 10, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'TXN 1006', sku: 'RAM 404', itemName: '32GB DDR5 RAM Kit', category: 'Components', quantity: 100, createdAt: new Date(Date.now() - 10800000).toISOString() },
  { id: 'TXN 1007', sku: 'RAM 404', itemName: '32GB DDR5 RAM Kit', category: 'Components', quantity: -4, createdAt: new Date(Date.now() - 12600000).toISOString() },
  { id: 'TXN 1008', sku: 'COMP 505', itemName: 'Desktop Gaming PC Tower', category: 'Computers', quantity: -1, createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: 'TXN 1009', sku: 'MONI 606', itemName: '27 inch 4K Monitor', category: 'Monitors', quantity: 15, createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: 'TXN 1010', sku: 'SSD 707', itemName: '2TB NVMe M.2 SSD', category: 'Storage', quantity: 40, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'TXN 1011', sku: 'SSD 707', itemName: '2TB NVMe M.2 SSD', category: 'Storage', quantity: -10, createdAt: new Date(Date.now() - 88200000).toISOString() },
  { id: 'TXN 1012', sku: 'MOUSE 101', itemName: 'Wireless Ergonomic Mouse', category: 'Accessories', quantity: -5, createdAt: new Date(Date.now() - 90000000).toISOString() },
  { id: 'TXN 1013', sku: 'KEYB 203', itemName: 'Compact Wireless Keyboard', category: 'Peripherals', quantity: 25, createdAt: new Date(Date.now() - 93600000).toISOString() },
  { id: 'TXN 1014', sku: 'LAPT 304', itemName: '13 inch Business Laptop', category: 'Computers', quantity: -3, createdAt: new Date(Date.now() - 97200000).toISOString() },
  { id: 'TXN 1015', sku: 'HEAD 808', itemName: 'Noise Canceling Bluetooth Headset', category: 'Audio', quantity: 30, createdAt: new Date(Date.now() - 176400000).toISOString() },
  { id: 'TXN 1016', sku: 'HEAD 808', itemName: 'Noise Canceling Bluetooth Headset', category: 'Audio', quantity: -8, createdAt: new Date(Date.now() - 178200000).toISOString() },
  { id: 'TXN 1017', sku: 'GPU 909', itemName: 'Graphics Card 16GB VRAM', category: 'Components', quantity: 5, createdAt: new Date(Date.now() - 180000000).toISOString() },
  { id: 'TXN 1018', sku: 'HUB 111', itemName: '7 in 1 USB C Hub', category: 'Accessories', quantity: -20, createdAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'TXN 1019', sku: 'PAD 113', itemName: 'XL Gaming Mouse Pad', category: 'Accessories', quantity: 100, createdAt: new Date(Date.now() - 266400000).toISOString() },
  { id: 'TXN 1020', sku: 'PAD 113', itemName: 'XL Gaming Mouse Pad', category: 'Accessories', quantity: -15, createdAt: new Date(Date.now() - 270000000).toISOString() },
];

const COLUMNS = [
  { id: 'id', label: 'Txn ID', defaultWidth: '10%' },
  { id: 'sku', label: 'SKU', defaultWidth: '12%' },
  { id: 'itemName', label: 'Item Name', defaultWidth: '25%' },
  { id: 'category', label: 'Category', defaultWidth: '15%' },
  {
    id: 'quantity',
    label: 'Quantity',
    align: 'center',
    defaultWidth: '13%',
    render: (row) => (
      <Chip
        label={row.quantity > 0 ? `+${row.quantity}` : row.quantity}
        color={row.quantity > 0 ? 'success' : 'error'}
        variant="outlined"
        size="small"
      />
    ),
  },
  {
    id: 'createdAt',
    label: 'Date & Time Recorded',
    defaultWidth: '17%',
    render: (row) => new Date(row.createdAt).toLocaleString(),
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
    sortable: false,
    defaultWidth: '8%',
  },
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
    <Paper elevation={3} sx={styles.paperContainer}>
      <Box sx={styles.headerBox}>
        <Box sx={styles.headerSpacer} />
        <Typography variant="h5" component="h1" sx={styles.titleText}>Transaction History</Typography>
        <Tooltip title="Refresh History">
          <IconButton onClick={fetchTransactions} color="primary"><RefreshIcon /></IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Box sx={styles.loadingBox}><CircularProgress /></Box>
      ) : (
        <>
          <TableContainer sx={styles.tableContainer}>
            <Table stickyHeader sx={styles.table} size="small" aria-label="transaction history table">
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

              <TableBody>
                {sortedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length} align="center" sx={styles.emptyCell}>
                      <Typography variant="body1" color="text.secondary">No transactions recorded yet.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTransactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id} hover sx={styles.tableRow}>
                        {COLUMNS.map((col) => (
                          <TableCell key={col.id} align={col.align || 'left'}>
                            {col.id === 'actions' ? (
                              <Tooltip title="Delete record independently">
                                <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : col.render ? (
                              col.render(row)
                            ) : (
                              row[col.id]
                            )}
                          </TableCell>
                        ))}
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