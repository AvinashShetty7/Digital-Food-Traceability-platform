import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // 🔹 Basic Info
  name: { type: String, required: true },

  // 🔹 Unique Product/Batch Code
  productCode: { type: String, required: true, unique: true },

  // 🔹 Manufacturer Reference
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 🔹 Raw Materials used (references to RawMaterial model)
  rawMaterials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterial",
      required: true,
    },
  ],

  // 🔹 Production details
  quantity: { type: Number, required: true },
  unit: {
    type: String,
    enum: ["kg", "litre", "ton", "pcs"],
    default: "kg",
  },

  // 🔹 Product lifecycle
  status: {
    type: String,
    enum: ["created", "in_production", "packaged", "shipped", "delivered"],
    default: "created",
  },
  verified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verifiedAt: { type: Date },
  verificationRemarks: { type: String },

  // 🔹 Images & QR codes
  imageUrl: { type: String, required: true },
  qrCode: { type: String }, // base64 or Cloudinary link for traceability

  // 🔹 Dates
  productionDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },

  // 🔹 Optional: Product history (trace log)
  traceHistory: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

// 🔹 Auto-generate productCode before save
productSchema.pre("save", function (next) {
  if (!this.productCode) {
    const prefix = this.name.substring(0, 3).toUpperCase(); // e.g., "FLO" from Flour
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    this.productCode = `${prefix}-${year}-${random}`;
  }
  next();
});

export default mongoose.model("Product", productSchema);
