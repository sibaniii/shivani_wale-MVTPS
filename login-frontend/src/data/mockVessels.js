// Simple mock data: vessels + metadata
const mockVessels = [
  {
    id: "VS-101",
    name: "Ocean Star",
    type: "Container",
    flag: "IN",
    status: "In Port",
    lastPort: "Mumbai",
    nextPort: "Dubai",
    eta: "2025-12-25 14:30",
    route: ["Mumbai", "Dubai"],
    cargo: "Electronics",
  },
  {
    id: "VS-204",
    name: "Sea Breeze",
    type: "Tanker",
    flag: "SG",
    status: "At Sea",
    lastPort: "Singapore",
    nextPort: "Chennai",
    eta: "2025-12-26 09:00",
    route: ["Singapore", "Chennai"],
    cargo: "Crude Oil",
  },
  {
    id: "VS-330",
    name: "Coral Queen",
    type: "Passenger",
    flag: "US",
    status: "Delayed",
    lastPort: "Cochin",
    nextPort: "Male",
    eta: "2025-12-25 22:10",
    route: ["Cochin", "Male"],
    cargo: "Passengers",
  },
];

export default mockVessels;
