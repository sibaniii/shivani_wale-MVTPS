import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppLayout({ children }) {
  const { signOut, role } = useAuth();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Maritime Dashboard</Typography>
          <Button color="inherit" component={Link} to="/vessels">Vessels</Button>
          <Button color="inherit" component={Link} to="/ports">Ports</Button>
          <Button color="inherit" component={Link} to="/companies">Companies</Button>
          <Button color="inherit" component={Link} to="/insurers">Insurers</Button>
          {role === "admin" && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
          <Button color="inherit" onClick={signOut}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}