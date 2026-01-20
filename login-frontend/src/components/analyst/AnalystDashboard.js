import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Box
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  ResponsiveContainer
} from 'recharts';
import DashboardShell from '../layout/DashboardShell';

// Sample vessel data
const vessels = [
  { id: 1, name: 'MV Horizon', status: 'At Sea', risk: 'High', eta: '2026-01-03 16:00', type: 'Bulk', speed: 14 },
  { id: 2, name: 'SS Coral', status: 'Delayed', risk: 'Medium', eta: '2026-01-02 20:00', type: 'Container', speed: 11 },
  { id: 3, name: 'MV Trident', status: 'In Port', risk: 'Low', eta: '2026-01-04 09:15', type: 'Tanker', speed: 0 },
];

// KPI data derived from vessels
const kpiData = [
  { kpi: 'Total Vessels', value: vessels.length },
  { kpi: 'High Risk', value: vessels.filter(v => v.risk === 'High').length },
  { kpi: 'Delayed', value: vessels.filter(v => v.status === 'Delayed').length },
  { kpi: 'In Port', value: vessels.filter(v => v.status === 'In Port').length },
  { kpi: 'Avg Speed', value: Math.round(vessels.reduce((a, c) => a + c.speed, 0) / vessels.length) },
];

export default function AnalystDashboard() {
  // Right panel content
  const rightPanel = (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>Distribution Map</Typography>
      <Box
        sx={{
          height: 200,
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <Typography variant="body2">
          Map placeholder — distribution by risk/type
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Notes</Typography>
      <Typography variant="body2">
        Track anomalies, cluster delays, and compare risk over corridors.
      </Typography>
    </>
  );

  return (
    <DashboardShell title="Analyst — KPIs & Distribution" right={rightPanel}>
      {/* KPI Chart */}
      <Typography variant="h6" sx={{ mb: 1 }}>KPIs</Typography>
      <Box sx={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={kpiData}>
            <XAxis dataKey="kpi" />
            <YAxis />
            <RTooltip />
            <Bar dataKey="value" fill="#00bcd4" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Vessel Details */}
      <Typography variant="h6" sx={{ mb: 1 }}>Vessel Details</Typography>
      {vessels.map(v => (
        <Card
          key={v.id}
          variant="outlined"
          sx={{
            mb: 2,
            borderLeft: `4px solid ${
              v.risk === 'High'
                ? '#ff4081'
                : v.risk === 'Medium'
                ? '#ffc107'
                : '#00bcd4'
            }`
          }}
        >
          <CardContent>
            <Typography variant="h6">{v.name}</Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={v.type} color="primary" size="small" />
              <Chip
                label={`Risk: ${v.risk}`}
                color={v.risk === 'High' ? 'secondary' : 'default'}
                size="small"
              />
              <Chip label={`Status: ${v.status}`} size="small" />
              <Chip label={`ETA: ${v.eta}`} size="small" />
              <Chip label={`Speed: ${v.speed} kn`} size="small" />
            </Box>
          </CardContent>
        </Card>
      ))}
    </DashboardShell>
  );
}