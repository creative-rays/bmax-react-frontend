// Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: 'lightgray',
        height: '100vh',
        padding: 2,
        borderRadius: '8px',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sidebar
      </Typography>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItem>
        {/* Add more sidebar items as needed */}
      </List>
    </Box>
  );
}

export default Sidebar;
