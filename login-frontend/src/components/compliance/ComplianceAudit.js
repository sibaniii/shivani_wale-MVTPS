import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function ComplianceAudit() {
  const [rules, setRules] = useState([]);
  const [violations, setViolations] = useState([]);

  const addRule = () => {
    setRules([...rules, { type: 'Speed Limit', value: '12 knots' }]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Compliance Audit</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Rule Type" size="small" />
        <TextField label="Value" size="small" />
        <Button variant="contained" onClick={addRule}>Add Rule</Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rule</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((rule, idx) => (
            <TableRow key={idx}>
              <TableCell>{rule.type}</TableCell>
              <TableCell>{rule.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="subtitle1" sx={{ mt: 3 }}>Violations</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vessel</TableCell>
            <TableCell>Violation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {violations.map((v, idx) => (
            <TableRow key={idx}>
              <TableCell>{v.vessel}</TableCell>
              <TableCell>{v.issue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}