import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children, allowRoles }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowRoles && !allowRoles.includes(role)) return <Navigate to="/no-access" replace />;
  return children;
}