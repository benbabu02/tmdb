import express from "express";
import axios from "axios";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/search", requireAuth, async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.status(400).json({ error: "Missing q" });

  const r = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: { api_key: process.env.TMDB_API_KEY, query: q, include_adult: false }
  });

  res.json(r.data);
});

router.get("/movie/:id", requireAuth, async (req, res) => {
  const r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
    params: { api_key: process.env.TMDB_API_KEY }
  });

  res.json(r.data);
});

export default router;
