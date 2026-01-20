// src/mock/mockData.js

// 🚢 Vessel positions offshore near Udupi/Malpe
export const vessels = [
  {
    name: 'MV Horizon',
    type: 'Bulk',
    status: 'At Sea',
    risk: 'High',
    eta: '2026-01-03 16:00',
    lat: 13.330,
    lng: 74.690,
  },
  {
    name: 'SS Coral',
    type: 'Container',
    status: 'Delayed',
    risk: 'Medium',
    eta: '2026-01-02 20:00',
    lat: 13.310,
    lng: 74.720,
  },
  {
    name: 'MV Trident',
    type: 'Tanker',
    status: 'In Port',
    risk: 'Low',
    eta: '2026-01-04 09:15',
    lat: 13.320,
    lng: 74.710,
  },
  {
    name: 'Ocean Pearl',
    type: 'Cruise',
    status: 'At Sea',
    risk: 'Low',
    eta: '2026-01-05 14:30',
    lat: 13.340,
    lng: 74.680,
  },
  {
    name: 'Sea Falcon',
    type: 'Cargo',
    status: 'Delayed',
    risk: 'High',
    eta: '2026-01-06 18:45',
    lat: 13.300,
    lng: 74.730,
  },
];

// ⚓ Example port stats
export const ports = [
  {
    name: 'Mangalore Port',
    avgWait: '8 hrs',
    arrivals: 12,
    departures: 9,
    congestion: 'Medium',
  },
  {
    name: 'Udupi Port',
    avgWait: '14 hrs',
    arrivals: 6,
    departures: 4,
    congestion: 'High',
  },
  {
    name: 'Karwar Port',
    avgWait: '5 hrs',
    arrivals: 8,
    departures: 7,
    congestion: 'Low',
  },
];

// 🌊 Example safety overlays
export const storms = [
  {
    lat: 13.35,
    lng: 74.70,
    radius: 10000,
    severity: 'High',
  },
];

export const piracyZones = [
  [
    [13.30, 74.68],
    [13.32, 74.72],
    [13.34, 74.70],
  ],
];

export const accidents = [
  {
    lat: 13.33,
    lng: 74.69,
    description: 'Collision reported Jan 2026',
  },
];