import { useEffect, useState } from "react";
import { getVessels } from "../api/endpoints";
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function VesselPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getVessels();
        setRows(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Typography variant="h5" mb={2}>Vessels</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Risk</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={6}>No data</TableCell></TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>{r.risk}</TableCell>
                  <TableCell>{r.eta}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.speed}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}