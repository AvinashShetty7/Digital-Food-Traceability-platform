import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpVerify() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { state } = useLocation();       // Get formData from Register Page
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);  // 60 sec countdown
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState("");

  // -------------------------
  // ⏱️ Countdown Timer Logic
  // -------------------------
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);


  // -------------------------
  // VERIFY OTP
  // -------------------------
  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/user/verify-otp`, {
        otp,
        email: state.email,
        formData: state // optional
      });

      if (res.status==200) {
        navigate("/login");
      } else {
        setMessage(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Verification failed");
    }
  };


  // -------------------------
  // RESEND OTP
  // -------------------------
  const handleResend = async () => {
    if (!canResend) return;

    try {
      const res = await axios.post(`${API_URL}/api/user/resend-otp`, {
        email: state.email
      });

      if (res.data.success) {
        setMessage("OTP has been resent!");
        setTimeLeft(60);     // Reset countdown
        setCanResend(false);
      } else {
        setMessage("Failed to resend OTP");
      }
    } catch (err) {
      setMessage("Something went wrong while resending OTP");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          OTP sent to <span className="font-semibold">{state?.email}</span>
        </p>

        {message && (
          <p className="text-center text-red-600 font-medium text-sm mb-4">
            {message}
          </p>
        )}

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
        >
          Verify OTP
        </button>

        {/* Countdown + Resend Button */}
        <div className="text-center mt-4">
          {!canResend ? (
            <p className="text-gray-600 text-sm">
              Resend OTP in <span className="font-semibold">{timeLeft}</span> sec
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
