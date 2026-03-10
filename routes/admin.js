import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/pending-users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        approved: false,
        role: { not: "ADMIN" }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/approve/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { approved: true }
    });

    res.json({ message: "User approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

export default router;
