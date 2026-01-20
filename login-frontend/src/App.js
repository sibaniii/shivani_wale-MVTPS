import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./auth/AuthContext";

import TopBar from "./components/layout/TopBar";
import Sidebar from "./components/layout/Sidebar";
import DashboardShell from "./components/layout/DashboardShell";

// Dashboards
import AdminDashboard from "./components/admin/AdminDashboard";
import OperatorDashboard from "./components/operator/OperatorDashboard";
import AnalystDashboard from "./components/analyst/AnalystDashboard";

// Extra dashboards/views
import CompanyDashboard from "./components/company/CompanyDashboard";
import PortDashboard from "./components/port/PortDashboard";
import InsurerDashboard from "./components/insurer/InsurerDashboard";
import VoyageReplay from "./components/replay/VoyageReplay";
import ComplianceAudit from "./components/compliance/ComplianceAudit";
import AdminTools from "./components/admin/AdminTools";

// Auth
import LoginPage from "./auth/LoginPage";

import "leaflet/dist/leaflet.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00bcd4" },
    secondary: { main: "#ff4081" },
    background: { default: "#0b0f13", paper: "#12171c" },
    text: { primary: "#e6f7ff", secondary: "#90a4ae" },
  },
  typography: {
    fontFamily: "Inter, Roboto, Segoe UI, Arial, sans-serif",
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

function App() {
  const { user, signOut } = useAuth();   // ✅ use context instead of local state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {user && (
          <>
            <TopBar
              user={user}
              handleLogout={handleLogout}
              toggleSidebar={toggleSidebar}
            />
            <Sidebar
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              user={user}
            />
          </>
        )}

        <Routes>
          {/* Public route: Login */}
          {!user && <Route path="/login" element={<LoginPage />} />}
          {!user && <Route path="*" element={<Navigate to="/login" replace />} />}

          {/* Admin routes */}
          {user?.role === "admin" && (
            <>
              <Route
                path="/admin"
                element={
                  <DashboardShell>
                    <AdminDashboard user={user} />
                  </DashboardShell>
                }
              />
              <Route
                path="/replay"
                element={
                  <DashboardShell>
                    <VoyageReplay voyageData={[]} />
                  </DashboardShell>
                }
              />
              <Route
                path="/audit"
                element={
                  <DashboardShell>
                    <ComplianceAudit />
                  </DashboardShell>
                }
              />
              <Route
                path="/tools"
                element={
                  <DashboardShell>
                    <AdminTools />
                  </DashboardShell>
                }
              />
              <Route
                path="/company"
                element={
                  <DashboardShell>
                    <CompanyDashboard />
                  </DashboardShell>
                }
              />
              <Route
                path="/port"
                element={
                  <DashboardShell>
                    <PortDashboard />
                  </DashboardShell>
                }
              />
              <Route
                path="/insurer"
                element={
                  <DashboardShell>
                    <InsurerDashboard />
                  </DashboardShell>
                }
              />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          )}

          {/* Operator routes */}
          {user?.role === "operator" && (
            <>
              <Route
                path="/operator"
                element={
                  <DashboardShell>
                    <OperatorDashboard />
                  </DashboardShell>
                }
              />
              <Route path="*" element={<Navigate to="/operator" replace />} />
            </>
          )}

          {/* Analyst routes */}
          {user?.role === "analyst" && (
            <>
              <Route
                path="/analyst"
                element={
                  <DashboardShell>
                    <AnalystDashboard />
                  </DashboardShell>
                }
              />
              <Route path="*" element={<Navigate to="/analyst" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;