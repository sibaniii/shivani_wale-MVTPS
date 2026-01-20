import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { FiUser, FiMenu } from 'react-icons/fi';

export default function TopBar({ user, handleLogout, toggleSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Capitalize role for display
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : '';

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {/* Sidebar toggle */}
        <IconButton
          onClick={toggleSidebar}
          color="inherit"
          sx={{ mr: 2 }}
          aria-label="toggle sidebar"
        >
          <FiMenu />
        </IconButton>

        {/* Welcome message */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hey, welcome back {roleLabel} {user?.username}!
        </Typography>

        {/* Profile menu */}
        <Box>
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            aria-label="profile menu"
          >
            <FiUser />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}