import { Navigate, Outlet } from "react-router-dom";
import HiddenButton from "../ui/hiddenButton";

export const ProtectedLayout = () => {
  const pin = localStorage.getItem("pin");

  if (!pin) {
    return <Navigate to="/" replace />;
  }

  return <>
  <HiddenButton />
  <Outlet />
  </>;
}; 