import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { generateEventQR, markAttendance } from "../controllers/qrController.js";

const router = express.Router();

// Only organizer/admin can generate QR
router.get("/generate/:eventId", verifyToken, generateEventQR);

// Student scans QR to mark attendance
router.post("/scan", verifyToken, markAttendance);

export default router;
