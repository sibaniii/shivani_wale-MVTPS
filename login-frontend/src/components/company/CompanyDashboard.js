import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CompanyDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Company Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Fleet performance, delivery rates, incidents (placeholder).
      </Typography>
    </Box>
  );
}