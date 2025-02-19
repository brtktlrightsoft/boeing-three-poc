import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
  const pin = localStorage.getItem("pin");

  if (!pin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}; 