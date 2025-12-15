import express from "express";
import Favorite from "../models/Favorite.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const items = await Favorite.find({ userId: req.user.sub }).sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", requireAuth, async (req, res) => {
  const { tmdbId, title, posterPath } = req.body;
  if (!tmdbId || !title) return res.status(400).json({ error: "tmdbId and title required" });

  try {
    const created = await Favorite.create({
      userId: req.user.sub,
      tmdbId,
      title,
      posterPath: posterPath || "",
      rating: 0,
      notes: ""
    });
    res.status(201).json(created);
  } catch {
    res.status(409).json({ error: "Already favorited" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { rating, notes } = req.body;

  const updated = await Favorite.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.sub },
    { $set: { rating, notes } },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user.sub });
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
