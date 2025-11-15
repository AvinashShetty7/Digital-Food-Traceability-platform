import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentType: {
    type: String,
    required: true,
  },
  documentUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  uploadedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "farmer", "manufacturer"],
    required: true,
  },

  verified: { type: Boolean, default: false }, // Admin verification
  emailVerified: { type: Boolean, default: false },
  // phoneVerified: { type: Boolean, default: false },

  // OTP fields (for OTP-based login)
  otp: { type: String },
  otpExpiry: { type: Date },

  documents: [documentSchema],

  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
