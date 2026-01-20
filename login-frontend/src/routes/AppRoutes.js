import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import RequireAuth from "../auth/RequireAuth";
import LoginPage from "../auth/LoginPage";
import AppLayout from "../layout/AppLayout";
import VesselPage from "../pages/VesselPage";
import PortPage from "../pages/PortPage";
import CompanyPage from "../pages/CompanyPage";
import InsurerPage from "../pages/InsurerPage";
import AdminPage from "../pages/AdminPage";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<VesselPage />} />
            <Route path="vessels" element={<VesselPage />} />
            <Route path="ports" element={<PortPage />} />
            <Route path="companies" element={<CompanyPage />} />
            <Route path="insurers" element={<InsurerPage />} />
            <Route
              path="admin"
              element={
                <RequireAuth allowRoles={["admin"]}>
                  <AdminPage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}