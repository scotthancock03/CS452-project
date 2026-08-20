import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  CircularProgress,
  Typography,
} from '@mui/material';

import TransactionHeader from './TransactionHeader';
import TransactionTableToolbar from './TransactionTableToolbar';
import TransactionRow from './TransactionRow';
import { styles } from './Transactions.styles';

export default function Transactions() {
  const [transactions, setTransactions] = useState([
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
  ]);

  const [columnWidths, setColumnWidths] = useState({
    id: '10%',
    sku: '12%',
    itemName: '25%',
    category: '15%',
    quantity: '13%',
    createdAt: '17%',
    actions: '8%',
  });

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Commented out for mock testing
    // fetchTransactions();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleColumnResize = (colId, width) => {
    setColumnWidths((prev) => ({
      ...prev,
      [colId]: width,
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction record?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } else {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aVal = a[orderBy];
    let bVal = b[orderBy];

    if (orderBy === 'createdAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Paper elevation={3} sx={styles.paperContainer}>
      <TransactionHeader onRefresh={fetchTransactions} />

      {loading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer sx={styles.tableContainer}>
            <Table stickyHeader sx={styles.table} size="small" aria-label="transaction history table">
              <TransactionTableToolbar
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                columnWidths={columnWidths}
                onColumnResize={handleColumnResize}
              />
              <TableBody>
                {sortedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={styles.emptyCell}>
                      <Typography variant="body1" color="text.secondary">
                        No transactions recorded yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTransactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <TransactionRow
                        key={transaction.id}
                        transaction={transaction}
                        onDelete={handleDelete}
                      />
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
            onPageChange={(e, newPage) => setPage(newPage)}
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