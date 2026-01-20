import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, onClose, user }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 280 }}>
        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <>
            <ListSubheader>Admin Navigation</ListSubheader>
            <ListItem button component={Link} to="/admin" onClick={onClose}>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/replay" onClick={onClose}>
              <ListItemText primary="Voyage Replay" />
            </ListItem>
            <ListItem button component={Link} to="/audit" onClick={onClose}>
              <ListItemText primary="Compliance Audit" />
            </ListItem>
            <ListItem button component={Link} to="/tools" onClick={onClose}>
              <ListItemText primary="Admin Tools" />
            </ListItem>
          </>
        )}

        {/* Company Navigation */}
        {user?.role === 'company' && (
          <>
            <ListSubheader>Company Navigation</ListSubheader>
            <ListItem button component={Link} to="/company" onClick={onClose}>
              <ListItemText primary="Company Dashboard" />
            </ListItem>
          </>
        )}

        {/* Port Navigation */}
        {user?.role === 'port' && (
          <>
            <ListSubheader>Port Navigation</ListSubheader>
            <ListItem button component={Link} to="/port" onClick={onClose}>
              <ListItemText primary="Port Dashboard" />
            </ListItem>
          </>
        )}

        {/* Insurer Navigation */}
        {user?.role === 'insurer' && (
          <>
            <ListSubheader>Insurer Navigation</ListSubheader>
            <ListItem button component={Link} to="/insurer" onClick={onClose}>
              <ListItemText primary="Insurer Dashboard" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}