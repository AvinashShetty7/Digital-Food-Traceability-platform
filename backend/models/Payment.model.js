import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  // 🔹 Parties involved
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // 🔹 Related raw material batches
  rawMaterials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial" }
  ],

  // 🔹 Payment details
  amount: { type: Number, required: true },
  paymentMode: {
    type: String,
    enum: ["online", "cash", "upi", "bank_transfer", "cheque"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
  },
  referenceNumber: { type: String }, // optional UPI ref / cheque no / bank txn ID
  paymentDate: { type: Date, default: Date.now },

  // 🔹 Proof (optional, image or PDF)
  proofUrl: { type: String }, // Cloudinary upload of receipt or screenshot

  // 🔹 Metadata
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
