import React from 'react';
import { Box } from '@mui/material';

export default function DashboardShell({ children }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar is already rendered in App.js */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          overflow: 'auto',
          backgroundColor: 'background.default',
          color: 'text.primary',
          minHeight: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}