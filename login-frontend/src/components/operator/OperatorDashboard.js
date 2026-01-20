import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Box
} from '@mui/material';
import { FiAnchor } from 'react-icons/fi';
import DashboardShell from '../layout/DashboardShell';

const vessels = [
  { id: 1, name: 'MV Horizon', status: 'At Sea', risk: 'High', type: 'Bulk' },
  { id: 2, name: 'SS Coral', status: 'Delayed', risk: 'Medium', type: 'Container' },
  { id: 3, name: 'MV Trident', status: 'In Port', risk: 'Low', type: 'Tanker' },
];

export default function OperatorDashboard() {
  const [selectedVesselId, setSelectedVesselId] = useState(vessels[0].id);

  const selectedVessel = vessels.find(v => v.id === selectedVesselId);

  const timeline = [
    { time: '08:30', task: 'Check weather updates', status: 'Done' },
    { time: '09:00', task: 'Confirm port clearance', status: 'Pending' },
    { time: '10:00', task: 'Route optimization', status: 'In Progress' },
  ];

  const rightPanel = (
    <>
      <Typography variant="h6">Quick Jump</Typography>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {vessels.map(v => (
          <Button
            key={v.id}
            variant="outlined"
            onClick={() => setSelectedVesselId(v.id)}
          >
            {v.name}
          </Button>
        ))}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Selected Vessel</Typography>
      {selectedVessel && (
        <Card variant="outlined" className="card-hover" sx={{ mt: 1 }}>
          <CardContent>
            <Typography variant="subtitle1">{selectedVessel.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              <Chip label={selectedVessel.status} />
              <Chip label={selectedVessel.type} color="primary" />
              <Chip
                label={`Risk: ${selectedVessel.risk}`}
                color={
                  selectedVessel.risk === 'High'
                    ? 'secondary'
                    : selectedVessel.risk === 'Medium'
                    ? 'warning'
                    : 'success'
                }
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );

  return (
    <DashboardShell title="Operator — Operations Timeline" right={rightPanel}>
      <Typography variant="h6" sx={{ mb: 1 }}>Operational Map</Typography>
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
          Map placeholder — plot vessels here
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>Timeline</Typography>
      <List dense>
        {timeline.map((t, idx) => (
          <ListItem key={idx}>
            <ListItemIcon><FiAnchor color="#00bcd4" /></ListItemIcon>
            <ListItemText
              primary={`${t.time} — ${t.task}`}
              secondary={`Status: ${t.status}`}
            />
          </ListItem>
        ))}
      </List>
    </DashboardShell>
  );
}