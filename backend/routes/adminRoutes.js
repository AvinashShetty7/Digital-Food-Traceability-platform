import express from "express";
import {
  getDashboardData,
  getAnalytics,
  verifyProduct,
  // getLogs,
} from "../controllers/adminController.js";
import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only
router.get("/dashboard", authMiddleware, roleCheck(["admin"]), getDashboardData);
router.get("/analytics", authMiddleware, roleCheck(["admin"]), getAnalytics);
router.put("/verify-product/:id", authMiddleware, roleCheck(["admin"]), verifyProduct);
// router.get("/logs", authMiddleware, roleCheck(["admin"]), getLogs);

export default router;
