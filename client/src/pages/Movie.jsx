import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../auth.jsx";

export default function Movie() {
  const { api } = useAuth();
  const { id } = useParams();
  const [m, setM] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await api.get(`/api/tmdb/movie/${id}`);
      setM(r.data);
    })();
  }, [api, id]);

  if (!m) return <div className="page fade">Loading...</div>;

  const poster = m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "";

  return (
    <div className="page fade">
      <div className="movie">
        {poster ? <img className="big" src={poster} alt={m.title} /> : null}
        <div>
          <h2>{m.title}</h2>
          <div className="muted">{m.release_date || ""}</div>
          <p>{m.overview || "No overview."}</p>
          <Link className="btn" to="/favorites">Go to Favorites</Link>
        </div>
      </div>
    </div>
  );
}
