import {  Outlet, useNavigate } from "react-router-dom";
import HiddenButton from "../ui/HiddenButton";

export const ProtectedLayout = () => {
  const pin = localStorage.getItem("pin");
  const navigate = useNavigate();
  if (!pin) {
    navigate("/pin-entry", { replace: true });
  }

  return <>
  <HiddenButton />
  <Outlet />
  </>;
}; 