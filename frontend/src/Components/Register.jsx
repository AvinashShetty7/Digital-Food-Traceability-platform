import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/api/user/register`, formData);

      if (res.data.success) {
        navigate("/otp", { state: formData });
      } else {
        setMessage(res.data.message || "Registration failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register Account
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-semibold">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Role</option>
              <option value="farmer">Farmer</option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
