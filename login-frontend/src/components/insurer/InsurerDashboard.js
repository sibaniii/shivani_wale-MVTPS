import React from 'react';
import { Box, Typography } from '@mui/material';

export default function InsurerDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Insurer Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Risk exposure, compliance scores (placeholder).
      </Typography>
    </Box>
  );
}