import React from 'react';
import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function AdminTools() {
  // Placeholder data for API sources
  const sources = [
    { name: 'MarineTraffic', status: 'Active' },
    { name: 'AIS Hub', status: 'Active' },
    { name: 'NOAA', status: 'Active' },
    { name: 'UNCTAD', status: 'Inactive' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Admin Tools</Typography>

      {/* API Source Management */}
      <Typography variant="h6" sx={{ mb: 1 }}>API Sources</Typography>
      <Table size="small" sx={{ mb: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sources.map((src, idx) => (
            <TableRow key={idx}>
              <TableCell>{src.name}</TableCell>
              <TableCell>{src.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Monitoring Actions */}
      <Typography variant="h6" sx={{ mb: 1 }}>Monitoring</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained">Sync Sources</Button>
        <Button variant="outlined">View Logs</Button>
      </Box>

      {/* Export Center */}
      <Typography variant="h6" sx={{ mb: 1 }}>Data Exports</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained">Export Vessels CSV</Button>
        <Button variant="contained">Export Compliance PDF</Button>
      </Box>
    </Box>
  );
}