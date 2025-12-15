import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: "Missing credential" });

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const p = ticket.getPayload();
  const user = { sub: p.sub, email: p.email, name: p.name, picture: p.picture };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, user });
});

router.post("/test-login", (req, res) => {
  if (process.env.ENABLE_TEST_LOGIN !== "true") return res.status(404).end();
  const user = { sub: "test-user", email: "test@example.com", name: "Test User", picture: "" };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user });
});

export default router;
