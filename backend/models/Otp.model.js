
import mongoose from "mongoose"
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpiry: Date,
});

export default mongoose.model("Otpmodel", otpSchema);
