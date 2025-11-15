import { useEffect, useState } from "react";
import axios from "axios";

export default function PendingUsers() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [pendingUsers, setPendingUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch pending users
  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/pending-users`);
      setPendingUsers(res.data.pendingusers || []);
    } catch (error) {
      setMessage("Failed to load pending users");
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  // VERIFY USER
  const handleVerify = async (userId) => {
    try {
      const res = await axios.put(`${API_URL}/api/user/verify-user/${userId}`);

      if (res.data.success) {
        setMessage("User verified successfully!");
        fetchPendingUsers(); // refresh list
      }
    } catch (error) {
      setMessage("Failed to verify user");
    }
  };

  // REJECT USER
  const handleReject = async (userId) => {
    try {
      const res = await axios.delete(`/api/auth/reject-user/${userId}`);

      if (res.data.success) {
        setMessage("User rejected!");
        fetchPendingUsers(); // refresh list
      }
    } catch (error) {
      setMessage("Failed to reject user");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Pending User Approvals
      </h1>

      {message && (
        <p className="mb-4 text-center text-sm font-medium text-blue-700">
          {message}
        </p>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pendingUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No pending users found
                </td>
              </tr>
            ) : (
              pendingUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>

                  {/* Action Buttons */}
                  <td className="p-4 flex justify-center gap-3">

                    <button
                      onClick={() => handleVerify(user._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                      Verify
                    </button>

                    <button
                      onClick={() => handleReject(user._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                      Reject
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
