import React from "react";

export default function MovieCard({ movie, onOpen, onSave }) {
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : "";
  return (
    <div className="card fade" onClick={onOpen}>
      {poster ? <img className="poster" src={poster} alt={movie.title} /> : <div className="poster ph">No Image</div>}
      <div className="body">
        <div className="t">{movie.title}</div>
        <div className="s">{movie.release_date || "Unknown"}</div>
        <button className="btn small" onClick={(e) => { e.stopPropagation(); onSave(); }}>Save</button>
      </div>
    </div>
  );
}
