import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function LoginPage() {
  const { signIn, loading, user } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [role, setRole] = useState(""); // 🔹 just for show
  const navigate = useNavigate();

  // 🔹 Redirect after login based on role
  useEffect(() => {
    if (user?.role === "admin") navigate("/admin", { replace: true });
    else if (user?.role === "operator") navigate("/operator", { replace: true });
    else if (user?.role === "analyst") navigate("/analyst", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn(form); // ✅ only username + password
    if (!res.ok) setError(res.error);
    // success path handled by useEffect redirect
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(to bottom, rgba(11,15,19,0.6), rgba(11,15,19,0.85)), url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 380,
          mx: "auto",
          p: 4,
          borderRadius: 2,
          bgcolor: "rgba(0,0,0,0.6)",
        }}
      >
        <Typography variant="h5" mb={2} color="white">
          Sign in
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* 🔹 Role dropdown (just for show) */}
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "white" }}>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ color: "white" }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
              <MenuItem value="analyst">Analyst</MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* 🔹 Register link */}
        <Typography variant="body2" mt={2} color="white" align="center">
          New user?{" "}
          <Link to="/register" style={{ color: "#00bcd4", textDecoration: "none" }}>
            Register now
          </Link>
        </Typography>
      </Box>
    </div>
  );
}