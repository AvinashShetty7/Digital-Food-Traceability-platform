import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

// ✅ Single image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    res.json({
      message: "Image uploaded successfully",
      url: req.file.path, // Cloudinary image URL
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
