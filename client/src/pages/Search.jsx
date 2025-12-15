import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import MovieCard from "../components/MovieCard.jsx";

function reducer(state, action) {
  if (action.type === "START") return { ...state, loading: true, error: "" };
  if (action.type === "DONE") return { loading: false, error: "", results: action.results };
  if (action.type === "ERR") return { ...state, loading: false, error: "Search failed" };
  return state;
}

export default function Search() {
  const { api, user } = useAuth();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [state, dispatch] = useReducer(reducer, { loading: false, error: "", results: [] });

  useEffect(() => {
    document.title = user ? `TMDB - ${user.name}` : "TMDB";
  }, [user]);

  const run = async () => {
    dispatch({ type: "START" });
    try {
      const r = await api.get("/api/tmdb/search", { params: { q } });
      dispatch({ type: "DONE", results: r.data.results || [] });
    } catch {
      dispatch({ type: "ERR" });
    }
  };

  const save = async (m) => {
    try {
      await api.post("/api/favorites", { tmdbId: m.id, title: m.title, posterPath: m.poster_path || "" });
    } catch {}
  };

  return (
    <div className="page fade">
      <h2>Search</h2>
      <div className="row">
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies..." />
        <button className="btn" disabled={!q || state.loading} onClick={run}>
          {state.loading ? "..." : "Go"}
        </button>
      </div>
      {state.error ? <div className="err">Search failed</div> : null}
      <div className="grid">
        {state.results.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onOpen={() => nav(`/movie/${m.id}`)}
            onSave={() => save(m)}
          />
        ))}
      </div>
    </div>
  );
}
