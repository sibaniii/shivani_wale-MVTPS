import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PortDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Port Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Congestion trends, berth utilization (placeholder).
      </Typography>
    </Box>
  );
}