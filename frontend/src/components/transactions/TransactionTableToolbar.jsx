import React, { useRef } from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { styles } from './Transactions.styles';

const headCells = [
  { id: 'id', label: 'Txn ID', align: 'left' },
  { id: 'sku', label: 'SKU', align: 'left' },
  { id: 'itemName', label: 'Item Name', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'quantity', label: 'Quantity Delta', align: 'center' },
  { id: 'createdAt', label: 'Date & Time Recorded', align: 'left' },
];

export default function TransactionTableToolbar({
  orderBy,
  order,
  onRequestSort,
  columnWidths,
  onColumnResize,
}) {
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const activeColRef = useRef(null);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleMouseDown = (e, colId) => {
    e.stopPropagation();
    e.preventDefault();
    startXRef.current = e.clientX;

    // Dynamically measure rendered pixel width from DOM instead of parsing percentage strings
    const thElement = e.currentTarget.parentElement;
    startWidthRef.current = thElement ? thElement.offsetWidth : 100;
    activeColRef.current = colId;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!activeColRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(80, startWidthRef.current + deltaX);
    onColumnResize(activeColRef.current, `${newWidth}px`);
  };

  const handleMouseUp = () => {
    activeColRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <TableHead sx={styles.tableHeader}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              ...styles.tableHeaderCell,
              width: columnWidths[headCell.id],
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={styles.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>

            <Box
              sx={styles.resizer}
              onMouseDown={(e) => handleMouseDown(e, headCell.id)}
            />
          </TableCell>
        ))}
        <TableCell
          align="center"
          sx={{
            ...styles.tableHeaderCell,
            width: columnWidths.actions,
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}