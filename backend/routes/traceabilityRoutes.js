import express from "express";
import {
  createTraceRecord,
  addTraceEvent,
  getTraceByProduct,
  updateTransport,
  deleteTraceRecord,
} from "../controllers/traceabilityController.js";
import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create when new product made
router.post("/create", authMiddleware, roleCheck(["manufacturer"]), createTraceRecord);

// Update product journey
router.put("/add-event/:productId", authMiddleware, roleCheck(["manufacturer", "admin"]), addTraceEvent);
router.put("/update-transport/:productId", authMiddleware, roleCheck(["admin"]), updateTransport);

// Get / Delete trace
router.get("/:productId", getTraceByProduct); // Public for QR scan
router.delete("/delete/:id", authMiddleware, roleCheck(["admin"]), deleteTraceRecord);

export default router;
