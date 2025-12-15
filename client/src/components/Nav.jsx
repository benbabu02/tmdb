import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";

export default function Nav() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="nav">
      <div className="left">
        <Link className="title" to="/search">TMDB</Link>
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
      <div className="right">
        {user ? (
          <>
            <span className="who">{user.name}</span>
            <button className="btn" onClick={() => { logout(); nav("/login"); }}>Logout</button>
          </>
        ) : (
          <Link className="btn" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
