import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styles } from './NavBar.styles';

function NavBar() {
  const location = useLocation();

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography component={Link} to="/inventory" sx={styles.logo}>
          Inventory Manager
        </Typography>

        <Box sx={styles.navLinksContainer}>
          <Button
            component={Link}
            to="/inventory"
            sx={styles.navButton(location.pathname === '/inventory' || location.pathname === '/')}
          >
            List Items
          </Button>
          <Button
            component={Link}
            to="/transactions"
            sx={styles.navButton(location.pathname === '/transactions')}
          >
            Transactions
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={styles.navButton(location.pathname === '/about')}
          >
            About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;