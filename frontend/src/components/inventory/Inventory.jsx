import React, { useState } from 'react';

import {
    Box,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableSortLabel,
    TablePagination,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack
} from '@mui/material';

import {
    Search as SearchIcon, Add as AddIcon, Edit as EditIcon,
    Delete as DeleteIcon, Refresh as RefreshIcon, Close as CloseIcon
} from '@mui/icons-material';

import { styles } from './Inventory.styles';

const initialProducts = [
    { id: 1, sku: 'MOU-101', name: 'Wireless Mouse', category: 'Electronics', quantity: 25, price: 19.99, description: 'Ergonomic 2.4GHz wireless mouse with adjustable DPI and silent clicks.' },
    { id: 2, sku: 'KEY-202', name: 'Mechanical Keyboard', category: 'Electronics', quantity: 12, price: 74.99, description: 'RGB hot-swappable mechanical keyboard featuring tactile brown switches.' },
    { id: 3, sku: 'CHR-303', name: 'Office Chair', category: 'Furniture', quantity: 8, price: 149.99, description: 'High-back ergonomic mesh chair with lumbar support and 3D armrests.' },
    { id: 4, sku: 'NTB-404', name: 'Notebook', category: 'Office Supplies', quantity: 50, price: 4.99, description: 'A5 dotted grid journal with 120gsm bleed-resistant ivory paper.' },
    { id: 5, sku: 'LMP-505', name: 'Desk Lamp', category: 'Furniture', quantity: 6, price: 29.99, description: 'Dimmable LED desk lamp with 5 color temperatures and USB charging port.' },
    { id: 6, sku: 'CAB-606', name: 'USB-C Cable', category: 'Electronics', quantity: 3, price: 12.99, description: '100W Power Delivery braided USB-C to USB-C cable (6ft length).' },
    { id: 7, sku: 'BTL-707', name: 'Water Bottle', category: 'Accessories', quantity: 32, price: 15.99, description: '32oz double-wall vacuum insulated stainless steel water bottle.' },
    { id: 8, sku: 'BPK-808', name: 'Backpack', category: 'Accessories', quantity: 10, price: 49.99, description: 'Water-resistant travel laptop backpack with anti-theft back pocket.' },
    { id: 9, sku: 'MON-909', name: '27-inch 4K Monitor', category: 'Electronics', quantity: 14, price: 299.99, description: 'IPS UHD 3840x2160 display with 99% sRGB color gamut and HDR10.' },
    { id: 10, sku: 'HDP-101', name: 'Noise-Canceling Headphones', category: 'Electronics', quantity: 18, price: 129.99, description: 'Over-ear active noise-canceling headphones with 40-hour battery life.' },
    { id: 11, sku: 'DSK-111', name: 'Standing Desk Converter', category: 'Furniture', quantity: 5, price: 189.99, description: 'Dual-tier pneumatic height-adjustable tabletop standing desk riser.' },
    { id: 12, sku: 'PEN-121', name: 'Gel Pen Set (12-Pack)', category: 'Office Supplies', quantity: 45, price: 9.99, description: 'Smooth writing 0.5mm quick-dry black ink rollerball gel pens.' },
    { id: 13, sku: 'STN-131', name: 'Aluminum Laptop Stand', category: 'Accessories', quantity: 22, price: 34.99, description: 'Foldable ventilated aluminum stand compatible with 10-17 inch laptops.' },
    { id: 14, sku: 'CAM-141', name: '1080p HD Webcam', category: 'Electronics', quantity: 9, price: 49.99, description: 'Full HD autofocus webcam with privacy shutter and stereo microphones.' },
    { id: 15, sku: 'FST-151', name: 'Ergonomic Footrest', category: 'Furniture', quantity: 11, price: 39.99, description: 'High-density memory foam under-desk footrest with non-slip bottom.' },
    { id: 16, sku: 'STK-161', name: 'Sticky Notes Multi-Pack', category: 'Office Supplies', quantity: 60, price: 6.49, description: 'Pack of 8 pastel self-adhesive 3x3 inch note pads.' },
    { id: 17, sku: 'HUB-171', name: 'USB 7-in-1 Multi-Port Hub', category: 'Electronics', quantity: 16, price: 27.99, description: 'USB-C hub featuring 4K HDMI, 3 USB 3.0 ports, SD reader, and 100W PD.' },
    { id: 18, sku: 'PAD-181', name: 'XL Desk Mouse Pad', category: 'Accessories', quantity: 40, price: 14.99, description: 'Extended 900x400mm waterproof desk mat with stitched edges.' },
    { id: 19, sku: 'SHR-191', name: 'Paper Shredder', category: 'Office Supplies', quantity: 4, price: 69.99, description: 'Cross-cut 8-sheet credit card and document shredder with wastebasket.' },
    { id: 20, sku: 'SSD-201', name: 'External 1TB NVMe SSD', category: 'Electronics', quantity: 20, price: 89.99, description: 'Ultra-fast USB 3.2 Gen 2 portable solid state drive up to 1050MB/s.' },
];

const COLUMNS = [
    { id: 'id', label: 'Item ID', width: '8%' },
    { id: 'sku', label: 'SKU', width: '10%' },
    { id: 'name', label: 'Product Name', width: '28%' },
    { id: 'category', label: 'Category', width: '16%' },
    { id: 'quantity', label: 'Stock', width: '12%', align: 'center' },
    { id: 'price', label: 'Price', width: '12%', align: 'right' },
    { id: 'actions', label: 'Actions', width: '14%', align: 'center', sortable: false },
];

const emptyForm = { sku: '', name: '', category: '', quantity: '', price: '', description: '' };

export default function Inventory() {
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);

    const handleSort = (prop) => {
        setOrder(orderBy === prop && order === 'asc' ? 'desc' : 'asc');
        setOrderBy(prop);
    };

    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOpenEdit = (e, item) => {
        e.stopPropagation();
        setEditingId(item.id);
        setFormData(item);
        setFormOpen(true);
    };

    const handleFormSave = () => {
        if (!formData.sku || !formData.name || !formData.category) return alert('Please fill required fields.');
        const item = { ...formData, quantity: +formData.quantity || 0, price: +formData.price || 0 };
        setProducts((prev) => editingId
            ? prev.map((p) => (p.id === editingId ? { ...item, id: editingId } : p))
            : [{ id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1, ...item }, ...prev]
        );
        setFormOpen(false);
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Delete this product?')) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
            if (selectedProduct?.id === id) setSelectedProduct(null);
        }
    };

    const filtered = products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return [p.id, p.sku, p.name, p.category, p.description].some((val) => String(val || '').toLowerCase().includes(q));
    }).sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === 'asc' ? 1 : -1));

    return (
        <Paper sx={styles.paperContainer}>
            <Box sx={styles.headerBox}>
                <Typography variant="h5" component="h1" fontWeight={700} fontSize="1.25rem">Inventory Management</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        size="small" placeholder="Search ID, SKU, Name..." value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
                        sx={{ width: 240, mr: 1.5, bgcolor: '#fff', '& .MuiInputBase-root': { height: 36, fontSize: '0.875rem' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" sx={{ color: '#64748B' }} /></InputAdornment> }}
                    />
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditingId(null); setFormData(emptyForm); setFormOpen(true); }} sx={{ height: 36, px: 2, mr: 1, bgcolor: '#1877F2', textTransform: 'none', fontWeight: 600, fontSize: '0.875rem', boxShadow: 'none', whiteSpace: 'nowrap' }}>Add Product</Button>
                    <Tooltip title="Reset List"><IconButton onClick={() => setProducts(initialProducts)} sx={{ height: 36, width: 36, color: '#1C2B46' }}><RefreshIcon fontSize="small" /></IconButton></Tooltip>
                </Box>
            </Box>

            <TableContainer sx={styles.tableContainer}>
                <Table stickyHeader sx={styles.table} size="small">
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
                    <TableBody sx={styles.tableBody}>
                        {filtered.length === 0 ? (
                            <TableRow><TableCell colSpan={7} align="center" sx={{ py: 2.5 }}><Typography color="text.secondary">No matching products found.</Typography></TableCell></TableRow>
                        ) : (
                            filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p) => (
                                <TableRow key={p.id} hover onClick={() => setSelectedProduct(p)} sx={styles.tableRow}>
                                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>{p.id}</TableCell>
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
                rowsPerPageOptions={[5, 10, 25]} component="div" count={filtered.length} rowsPerPage={rowsPerPage} page={page}
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
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>ITEM ID</Typography>
                                    <Typography variant="body1" fontWeight={600} color="#334155">#{selectedProduct.id}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>SKU</Typography>
                                    <Typography variant="body1" fontWeight={600} color="#1877F2">{selectedProduct.sku}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>ITEM NAME</Typography>
                                    <Typography variant="body1" fontWeight={600}>{selectedProduct.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>CATEGORY</Typography>
                                    <Box mt={0.5}><Chip label={selectedProduct.category} size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155' }} /></Box>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>CURRENT STOCK</Typography>
                                    <Box mt={0.5}><Chip label={selectedProduct.quantity} sx={styles.quantityChip(selectedProduct.quantity)} /></Box>
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
                            <TextField label="SKU" name="sku" value={formData.sku} onChange={handleFormChange} fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }} />
                            <TextField label="Category" name="category" value={formData.category} onChange={handleFormChange} fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }} />
                        </Box>
                        <TextField label="Product Name" name="name" value={formData.name} onChange={handleFormChange} fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }} />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="Stock Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleFormChange} fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }} />
                            <TextField label="Price ($)" name="price" type="number" value={formData.price} onChange={handleFormChange} fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }} />
                        </Box>
                        <TextField label="Description" name="description" value={formData.description} onChange={handleFormChange} fullWidth multiline rows={3} size="small" slotProps={{ inputLabel: { shrink: true } }} />
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