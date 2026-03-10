import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 🔹 ROUTES
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express(); // ✅ MUST be before app.use()

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔹 ROUTES
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// 🔹 TEST ROUTE
app.get("/", (req, res) => {
  res.send("GU-EMS Backend Running 🚀");
});

// 🔹 SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
