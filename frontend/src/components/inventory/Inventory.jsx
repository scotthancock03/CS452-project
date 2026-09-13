import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Table, TableHead, TableBody, TableCell, TableContainer, TableRow,
  TableSortLabel, TablePagination, Typography, Chip, IconButton, Tooltip,
  TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Stack
} from '@mui/material';
import {
  Search as SearchIcon, Add as AddIcon, Edit as EditIcon,
  Delete as DeleteIcon, Refresh as RefreshIcon, Close as CloseIcon
} from '@mui/icons-material';
import { styles } from './Inventory.styles';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';

const COLUMNS = [
  { id: 'sku', label: 'SKU', width: '14%' },
  { id: 'name', label: 'Product Name', width: '32%' },
  { id: 'category', label: 'Category', width: '18%' },
  { id: 'quantity', label: 'Stock', width: '12%', align: 'center' },
  { id: 'price', label: 'Price', width: '12%', align: 'right' },
  { id: 'actions', label: 'Actions', width: '12%', align: 'center', sortable: false },
];

const emptyForm = {
  sku: '',
  name: '',
  category: '',
  quantity: '',
  price: '',
  lowStockThreshold: 5,
  description: ''
};

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const loadProducts = async () => {
    try {
      const data = await getItems();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load items:', err.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSort = (prop) => {
    setOrder(orderBy === prop && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const val = name === 'sku' ? value.toUpperCase() : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleOpenEdit = (e, item) => {
    e.stopPropagation();
    setEditingId(item.id);
    setFormData({
      ...item,
      lowStockThreshold: item.lowStockThreshold ?? 5,
      description: item.description || ''
    });
    setErrors({});
    setFormOpen(true);
  };

const validateForm = () => {
    const newErrors = {};
    const skuTrimmed = formData.sku.trim();

    // SKU Validation
    if (!skuTrimmed) newErrors.sku = 'Please add a SKU';
    else if (!/^[A-Z0-9]{6,12}$/.test(skuTrimmed)) newErrors.sku = 'SKU must be 6–12 letters/numbers';
    else if (products.some((p) => p.sku === skuTrimmed && p.id !== editingId)) newErrors.sku = 'SKU already exists';

    // Text Fields
    if (!formData.name.trim()) newErrors.name = 'Please add an item name';
    if (!formData.category.trim()) newErrors.category = 'Please select a category';

    // Stock Quantity Validation
    if (formData.quantity === '' || formData.quantity === null || formData.quantity === undefined) {
      newErrors.quantity = 'Please add a stock quantity';
    } else if (Number(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    // Unit Price Validation
    if (formData.price === '' || formData.price === null || formData.price === undefined) {
      newErrors.price = 'Please add a price';
    } else if (Number(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    // Low Stock Alert Validation
    if (formData.lowStockThreshold === '' || formData.lowStockThreshold === null || formData.lowStockThreshold === undefined) {
      newErrors.lowStockThreshold = 'Please add a low stock threshold';
    } else if (Number(formData.lowStockThreshold) < 0) {
      newErrors.lowStockThreshold = 'Threshold cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSave = async () => {
    if (!validateForm()) return;

    const payload = {
      sku: formData.sku.trim(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      quantity: Math.floor(Number(formData.quantity)),
      price: Number(formData.price),
      lowStockThreshold: Math.floor(Number(formData.lowStockThreshold)),
      description: formData.description.trim(),
    };

    try {
      if (editingId) {
        const updated = await updateItem(editingId, payload);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        const created = await createItem(payload);
        setProducts((prev) => [created, ...prev]);
      }
      setFormOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteItem(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (selectedProduct?.id === id) setSelectedProduct(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return [p.sku, p.name, p.category, p.description].some((val) => String(val || '').toLowerCase().includes(q));
  }).sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === 'asc' ? 1 : -1));

  return (
    <Paper sx={styles.paperContainer}>
      <Box sx={styles.headerBox}>
        <Typography variant="h5" component="h1" fontWeight={700} fontSize="1.25rem">Inventory Management</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small" placeholder="Search SKU, Name..." value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            sx={{ width: 240, mr: 1.5, bgcolor: '#fff', '& .MuiInputBase-root': { height: 36, fontSize: '0.875rem' } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" sx={{ color: '#64748B' }} /></InputAdornment> }}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditingId(null); setFormData(emptyForm); setErrors({}); setFormOpen(true); }} sx={{ height: 36, px: 2, mr: 1, bgcolor: '#1877F2', textTransform: 'none', fontWeight: 600, fontSize: '0.875rem', boxShadow: 'none', whiteSpace: 'nowrap' }}>Add Product</Button>
          <Tooltip title="Reset List"><IconButton onClick={loadProducts} sx={{ height: 36, width: 36, color: '#1C2B46' }}><RefreshIcon fontSize="small" /></IconButton></Tooltip>
        </Box>
      </Box>

      {/* Passes rowsPerPage to conditionally toggle between hidden and auto scrolling */}
      <TableContainer sx={styles.tableContainer(rowsPerPage)}>
        <Table stickyHeader sx={styles.table(rowsPerPage)} size="small">
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableCell key={col.id} align={col.align || 'left'} sx={{ width: col.width }}>
                  {col.sortable !== false ? (
                    <TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : 'asc'} onClick={() => handleSort(col.id)}>
                      {col.label}
                    </TableSortLabel>
                  ) : col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={styles.tableBody(rowsPerPage)}>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 2.5 }}><Typography color="text.secondary">No matching products found.</Typography></TableCell></TableRow>
            ) : (
              filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p) => (
                <TableRow key={p.id} hover onClick={() => setSelectedProduct(p)} sx={styles.tableRow(rowsPerPage)}>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1877F2' }}>{p.sku}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell><Chip label={p.category} sx={{ bgcolor: '#F1F5F9', color: '#334155', fontWeight: 500, fontSize: '0.75rem', height: 24 }} /></TableCell>
                  <TableCell align="center"><Chip label={p.quantity} sx={styles.quantityChip(p.quantity)} /></TableCell>
                  <TableCell align="right">${Number(p.price).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={(e) => handleOpenEdit(e, p)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" color="error" onClick={(e) => handleDelete(e, p.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[ 10, 25, 50]} component="div" count={filtered.length} rowsPerPage={rowsPerPage} page={page}
        onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
        sx={styles.paginationBar}
      />

      {/* Details Dialog */}
      <Dialog open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
              <Typography variant="h6" fontWeight={700} color="#1C2B46">Product Details</Typography>
              <IconButton onClick={() => setSelectedProduct(null)} size="small"><CloseIcon fontSize="small" /></IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ py: 2.5 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2.5, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>SKU</Typography>
                  <Typography variant="body1" fontWeight={600} color="#1877F2">{selectedProduct.sku}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>CATEGORY</Typography>
                  <Box mt={0.5}><Chip label={selectedProduct.category} size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155' }} /></Box>
                </Box>
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>ITEM NAME</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedProduct.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>CURRENT STOCK</Typography>
                  <Box mt={0.5}><Chip label={selectedProduct.quantity} sx={styles.quantityChip(selectedProduct.quantity)} /></Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>LOW STOCK THRESHOLD</Typography>
                  <Typography variant="body1" fontWeight={600} color="#334155">{selectedProduct.lowStockThreshold ?? 5}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>UNIT PRICE</Typography>
                  <Typography variant="body1" fontWeight={700}>${Number(selectedProduct.price).toFixed(2)}</Typography>
                </Box>
              </Box>
              <Box sx={{ pt: 1, borderTop: '1px solid #E2E8F0' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>DESCRIPTION</Typography>
                <Typography variant="body2" color="#334155" sx={{ mt: 0.5, lineHeight: 1.6 }}>{selectedProduct.description || 'No description provided.'}</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 1.5 }}>
              <Button onClick={() => setSelectedProduct(null)} sx={{ color: '#64748B' }}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#1C2B46', py: 2 }}>
          {editingId ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="SKU" name="sku" value={formData.sku} onChange={handleFormChange}
                fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.sku)} helperText={errors.sku}
              />
              <TextField
                label="Category" name="category" value={formData.category} onChange={handleFormChange}
                fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.category)} helperText={errors.category}
              />
            </Box>
            <TextField
              label="Product Name" name="name" value={formData.name} onChange={handleFormChange}
              fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }}
              error={Boolean(errors.name)} helperText={errors.name}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Stock Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleFormChange}
                fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.quantity)} helperText={errors.quantity}
              />
              <TextField
                label="Price ($)" name="price" type="number" value={formData.price} onChange={handleFormChange}
                fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.price)} helperText={errors.price}
              />
              <TextField
                label="Low Stock Alert" name="lowStockThreshold" type="number" value={formData.lowStockThreshold} onChange={handleFormChange}
                fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.lowStockThreshold)} helperText={errors.lowStockThreshold}
              />
            </Box>
            <TextField
              label="Description" name="description" value={formData.description} onChange={handleFormChange}
              fullWidth multiline rows={3} size="small" slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setFormOpen(false)} sx={{ color: '#64748B' }}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSave} sx={{ bgcolor: '#1877F2', textTransform: 'none', px: 2.5 }}>{editingId ? 'Save Changes' : 'Create Product'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}