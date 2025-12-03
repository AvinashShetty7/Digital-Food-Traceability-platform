// src/pages/admin/ViewFarmerDocs.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Viewfarmerdocs() {
  const { farmerId } = useParams(); 
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/api/admin/singlefarmer/${farmerId}`,
          { withCredentials: true }
        ); 
        console.log(res.data.farmers);
        
        setFarmer(res.data.farmers); // adjust based on your API response
      } catch (err) {
        console.error(err);
        setError("Failed to load farmer documents");
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) fetchFarmer();
  }, [farmerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-600 text-lg">Loading farmer documents...</p>
      </div>
    );
  }

  if (error || !farmer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-red-600 font-semibold mb-4">{error || "Farmer not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ensure we only show first 4 docs
  console.log(farmer.documents);
  
  const docsToShow = farmer.documents?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Farmer Documents
            </h1>
            <p className="text-sm text-slate-600">
              Farmer ID: <span className="font-mono">{farmerId}</span>
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50"
          >
            ← Back
          </button>
        </div>

        {/* Farmer Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            {farmer.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-slate-700">
            <p><span className="font-medium">Email:</span> {farmer.email}</p>
            <p><span className="font-medium">Phone:</span> {farmer.phone}</p>
            <p><span className="font-medium">Role:</span> {farmer.role}</p>
          </div>
        </div>

        {/* Documents Grid - BIG IMAGES */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Uploaded Documents
          </h3>

          {docsToShow.length === 0 ? (
            <p className="text-slate-500 text-sm">No documents uploaded.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docsToShow.map((doc, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                >
                  <div className="p-3 border-b border-slate-200">
                    <p className="font-medium text-sm text-slate-800">
                      {doc.documentType || `Document ${index + 1}`}
                    </p>
                  </div>

                  {/* BIG image */}
                  <div className="w-full h-80 bg-slate-200">
                    <img
                      src={doc.documentUrl}
                      alt={doc.documentType || `Document ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
