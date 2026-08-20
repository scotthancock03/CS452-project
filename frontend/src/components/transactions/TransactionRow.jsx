import React from 'react';
import { TableRow, TableCell, Chip, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from './Transactions.styles';

export default function TransactionRow({ transaction, onDelete }) {
  const isAdded = transaction.quantity > 0;
  const formattedQuantity = isAdded ? `+${transaction.quantity}` : `${transaction.quantity}`;

  return (
    <TableRow hover sx={styles.tableRow}>
      <TableCell sx={styles.skuCell}>{transaction.id}</TableCell>
      <TableCell sx={styles.skuCell}>{transaction.sku}</TableCell>
      <TableCell>{transaction.itemName}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell align="center">
        <Chip
          label={formattedQuantity}
          color={isAdded ? 'success' : 'error'}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        {new Date(transaction.createdAt).toLocaleString()}
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Delete record independently">
          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(transaction.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}