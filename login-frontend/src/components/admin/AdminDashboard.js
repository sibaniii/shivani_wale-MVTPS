// src/components/admin/AdminDashboard.js

import React, { useMemo, useState } from 'react';
import {
  Box, Typography, TextField, MenuItem, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider,
  IconButton, Badge
} from '@mui/material';
import {
  DirectionsBoat, Warning, AccessTime, Person,
  Anchor, Waves, ReportProblem, BarChart, Notifications
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Import mock data
import { vessels, ports, storms, piracyZones, accidents } from '../../mock/mockData';

// 🚢 Boat icon by risk level
const getMarkerIcon = (risk) => {
  let color = 'blue';
  if (risk === 'High') color = 'red';
  else if (risk === 'Medium') color = 'orange';
  else if (risk === 'Low') color = 'green';

  return L.divIcon({
    className: 'custom-boat-icon',
    html: `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.6))">
        <path d="M3 20h18l-9-16-9 16z"/>
      </svg>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 20],
  });
};
export default function AdminDashboard({ user }) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter vessels based on search + filters
  const filteredVessels = useMemo(() => {
    return vessels.filter((v) => {
      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = riskFilter === 'All' || v.risk === riskFilter;
      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      return matchesSearch && matchesRisk && matchesStatus;
    });
  }, [search, riskFilter, statusFilter]);

  // Stats for overview cards
  const totalVessels    = vessels.length;
  const highRiskCount   = vessels.filter((v) => v.risk === 'High').length;
  const mediumRiskCount = vessels.filter((v) => v.risk === 'Medium').length;
  const lowRiskCount    = vessels.filter((v) => v.risk === 'Low').length;
  const inPortCount     = vessels.filter((v) => v.status === 'In Port').length;
  const atSeaCount      = vessels.filter((v) => v.status === 'At Sea').length;
  const delayedCount    = vessels.filter((v) => v.status === 'Delayed').length;
  const nextArrival     = [...vessels.map((v) => v.eta)].sort()[0] || '—';

  const stats = [
    { label: 'Total Vessels',    value: totalVessels,   icon: <DirectionsBoat /> },
    { label: 'High Risk Alerts', value: highRiskCount,  icon: <Warning /> },
    { label: 'Next Arrival',     value: nextArrival,    icon: <AccessTime /> },
    { label: 'Logged-in User',   value: `Admin ${user?.username}`, icon: <Person /> },
    { label: 'Vessels In Port',  value: inPortCount,    icon: <Anchor /> },
    { label: 'Vessels At Sea',   value: atSeaCount,     icon: <Waves /> },
    { label: 'Delayed Vessels',  value: delayedCount,   icon: <ReportProblem /> },
    { label: 'Risk Breakdown',   value: `H:${highRiskCount} M:${mediumRiskCount} L:${lowRiskCount}`, icon: <BarChart /> },
  ];
  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Notifications */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Box>

      {/* System Overview */}
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        System Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {stat.icon}
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </Box>
                <Typography variant="h5" sx={{ mt: 2 }}>{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* Vessel Details */}
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Vessel Details
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField label="Search Vessel" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
        <TextField select label="Risk" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
        <TextField select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="At Sea">At Sea</MenuItem>
          <MenuItem value="In Port">In Port</MenuItem>
          <MenuItem value="Delayed">Delayed</MenuItem>
        </TextField>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Risk</TableCell>
              <TableCell>ETA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVessels.map((vessel, idx) => (
              <TableRow key={idx}>
                <TableCell>{vessel.name}</TableCell>
                <TableCell>{vessel.type}</TableCell>
                <TableCell>{vessel.status}</TableCell>
                <TableCell>{vessel.risk}</TableCell>
                <TableCell>{vessel.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ mb: 3 }} />
      {/* Port Dashboard */}
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Port Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {ports.map((port, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">{port.name}</Typography>
                <Typography variant="body2">Avg Wait: {port.avgWait}</Typography>
                <Typography variant="body2">Arrivals: {port.arrivals}</Typography>
                <Typography variant="body2">Departures: {port.departures}</Typography>
                <Typography variant="body2">Congestion: {port.congestion}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Port</TableCell>
              <TableCell>Avg Wait Time</TableCell>
              <TableCell>Arrivals</TableCell>
              <TableCell>Departures</TableCell>
              <TableCell>Congestion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ports.map((port, idx) => (
              <TableRow key={idx}>
                <TableCell>{port.name}</TableCell>
                <TableCell>{port.avgWait}</TableCell>
                <TableCell>{port.arrivals}</TableCell>
                <TableCell>{port.departures}</TableCell>
                <TableCell>{port.congestion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ mb: 3 }} />
      {/* Live Map with Safety Overlays */}
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Live Map & Safety Analytics
      </Typography>
      <MapContainer
        center={[13.32, 74.71]}
        zoom={11}
        style={{ height: '500px', width: '100%', marginBottom: '2rem', borderRadius: '8px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Vessel markers */}
        {filteredVessels.map((vessel, idx) => (
          <Marker key={idx} position={[vessel.lat, vessel.lng]} icon={getMarkerIcon(vessel.risk)}>
            <Popup>
              <Typography variant="subtitle2">{vessel.name}</Typography>
              <Typography variant="body2">Type: {vessel.type}</Typography>
              <Typography variant="body2">Status: {vessel.status}</Typography>
              <Typography variant="body2">Risk: {vessel.risk}</Typography>
              <Typography variant="body2">ETA: {vessel.eta}</Typography>
            </Popup>
          </Marker>
        ))}

        {/* Storm overlays */}
        {storms.map((storm, idx) => (
          <Circle
            key={idx}
            center={[storm.lat, storm.lng]}
            radius={storm.radius}
            pathOptions={{ color: 'purple', fillOpacity: 0.3 }}
          >
            <Popup>Storm Alert — Severity: {storm.severity}</Popup>
          </Circle>
        ))}

        {/* Piracy zones */}
        {piracyZones.map((zone, idx) => (
          <Polygon
            key={idx}
            positions={zone}
            pathOptions={{ color: 'red', fillOpacity: 0.2 }}
          >
            <Popup>Piracy Zone</Popup>
          </Polygon>
        ))}

        {/* Accident markers */}
        {accidents.map((acc, idx) => (
          <Marker key={idx} position={[acc.lat, acc.lng]}>
            <Popup>{acc.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* End of Map */}
    </Box>
  );
}