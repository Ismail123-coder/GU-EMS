import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET approved events
router.get("/", verifyToken, async (req, res) => {
  try {
    // TEMP dummy data (to confirm frontend works)
    res.json([
      {
        id: 1,
        title: "Tech Fest",
        date: "2025-01-10",
        status: "APPROVED"
      }
    ]);
  } catch (err) {
    res.status(500).json({ message: "Failed to load events" });
  }
});

export default router;
