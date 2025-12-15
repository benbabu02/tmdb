import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";

export default function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
