import express from "express";
import upload from "../middleware/upload.js";
import { uploadKYC } from "../controllers/farmerController.js";
import { uploadManufacturerKYC } from "../controllers/ManufacturerController.js";
import { createRawMaterial } from "../controllers/farmerController.js";

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

router.post(
  "/uploadManufacturer-kyc",
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "GSTCertificateCard", maxCount: 1 },
    { name: "FactoryAddressProofRecord", maxCount: 1 },
    { name: "FactoryPhoto", maxCount: 1 },
    { name: "FSSAILicense", maxCount: 1 },
  ]),
  uploadManufacturerKYC
);

router.post(
  "/upload-farmimage",
  upload.single("imageUrl"),
  createRawMaterial
);

export default router;
