import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./src/db.js";
import authRoutes from "./src/routes/auth.js";
import tmdbRoutes from "./src/routes/tmdb.js";
import favoritesRoutes from "./src/routes/favorites.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/favorites", favoritesRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "../client/dist");

app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

await connectDb(process.env.MONGODB_URI);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log("server on", port));
