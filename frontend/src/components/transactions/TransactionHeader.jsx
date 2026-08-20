import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styles } from './Transactions.styles';

export default function TransactionHeader({ onRefresh }) {
  return (
    <Box sx={styles.headerBox}>
      {/* Spacer to balance the layout */}
      <Box sx={styles.headerSpacer} />

      <Typography variant="h5" component="h1" sx={styles.titleText}>
        Transaction History
      </Typography>

      <Tooltip title="Refresh History">
        <IconButton onClick={onRefresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}