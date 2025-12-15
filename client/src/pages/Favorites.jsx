import React, { useEffect, useState } from "react";
import { useAuth } from "../auth.jsx";

export default function Favorites() {
  const { api } = useAuth();
  const [items, setItems] = useState([]);

  const load = async () => {
    const r = await api.get("/api/favorites");
    setItems(r.data);
  };

  useEffect(() => {
    load();
  }, []);

  const update = async (id, patch) => {
    await api.put(`/api/favorites/${id}`, patch);
    await load();
  };

  const del = async (id) => {
    await api.delete(`/api/favorites/${id}`);
    await load();
  };

  return (
    <div className="page fade">
      <h2>Favorites</h2>
      {items.map((f) => (
        <div className="fav" key={f._id}>
          <div className="ft">{f.title}</div>
          <input className="input small" type="number" min="0" max="10" value={f.rating}
            onChange={(e) => update(f._id, { rating: Number(e.target.value), notes: f.notes })} />
          <input className="input" value={f.notes}
            onChange={(e) => update(f._id, { rating: f.rating, notes: e.target.value })} />
          <button className="btn small" onClick={() => del(f._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
