import { useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function FarmerDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-xl p-5 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-6">Farmer Menu</h2>
        <nav className="space-y-4">
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium">Add Raw Material</button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium">View My Raw Material</button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium">View Current Market Price</button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium">Uploaded Documents</button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium">Update Profile</button>
        </nav>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden absolute top-4 left-4 z-30"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar */}
        <header className="w-full bg-white shadow flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Farmer Dashboard</h1>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200">
              <User size={22} />
              Profile
            </button>

            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-xl p-5 space-y-4">
            <h2 className="text-lg font-bold">Profile Details</h2>
            <div className="flex flex-col items-start gap-3">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Change Profile Picture</button>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white shadow rounded-xl p-5 space-y-4">
            <h2 className="text-lg font-bold">Uploaded Documents</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Aadhar Card ✓</li>
              <li>Kisan Card ✓</li>
              <li>Land Record ✓</li>
              <li>Selfie ✓</li>
            </ul>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">View Documents</button>
          </div>
        </div>
      </div>
    </div>
  );
}
