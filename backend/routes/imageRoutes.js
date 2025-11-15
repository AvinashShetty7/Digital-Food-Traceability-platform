import express from "express";
import upload from "../middleware/upload.js";
import { uploadKYC } from "../controllers/farmerController.js";

const router = express.Router();

// Upload 4 KYC documents
router.post(
  "/upload-kyc",
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "kisanCard", maxCount: 1 },
    { name: "landRecord", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
  ]),
  uploadKYC
);

export default router;
