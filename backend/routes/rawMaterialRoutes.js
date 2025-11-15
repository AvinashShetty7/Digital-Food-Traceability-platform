import express from "express";
import upload from "../middleware/upload.js";
import {
  addRawMaterial,
  getRawMaterialsByFarmer,
  getAllRawMaterials,
  getSingleRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
  markAsConsumed,
} from "../controllers/rawMaterialController.js";

// import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", addRawMaterial);  //
router.get("/myraws", getRawMaterialsByFarmer);

// // Manufacturer/Admin view
router.get("/all",getAllRawMaterials);
router.get("/:id",getSingleRawMaterial);

// // Update/Delete
router.put("/update/:id", updateRawMaterial);
router.delete("/delete/:id",deleteRawMaterial);

// // Mark as consumed (by manufacturer)
router.put("/mark-consumed/:id",  markAsConsumed);

export default router;
