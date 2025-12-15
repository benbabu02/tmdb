import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";

export default function Login() {
  const { loginGoogle, testLogin } = useAuth();
  const nav = useNavigate();

  return (
    <div className="page center fade">
      <div className="panel">
        <h1>Login</h1>
        <GoogleLogin
          onSuccess={async (r) => {
            await loginGoogle(r.credential);
            nav("/search");
          }}
        />
        <div className="gap" />
        <button className="btn" onClick={async () => { await testLogin(); nav("/search"); }}>
          Dev/Test Login
        </button>
      </div>
    </div>
  );
}
