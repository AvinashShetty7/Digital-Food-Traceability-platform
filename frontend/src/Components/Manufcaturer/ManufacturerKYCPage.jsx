import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function ManufacturerKYCPage() {
  const [open, setOpen] = useState(false);

  const [aadhar, setAadhar] = useState(null);
  const [GSTCertificate, setGSTCertificate] = useState(null);
  const [FactoryAddressProof, setFactoryAddressProof] = useState(null);
  const [FactoryPhoto, setFactoryPhoto] = useState(null);
  const [FSSAILicense, setFSSAILicense] = useState(null);


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("aadhar", aadhar);
      formData.append("GSTCertificateCard", GSTCertificate);
      formData.append("FactoryAddressProofRecord", FactoryAddressProof);
      formData.append("FactoryPhoto", FactoryPhoto);
      formData.append("FSSAILicense",FSSAILicense)

      const res = await axios.post(
        "http://localhost:3000/api/farmer/uploadManufacturer-kyc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-xl p-5 transition-transform duration-300 
        lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-6">Manufacturer Panel</h2>

        <nav className="space-y-4">
          <a
            href="#add-docs"
            className="block p-2 rounded-lg hover:bg-gray-200 font-medium"
          >
            Add Documents
          </a>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden absolute top-4 left-4 z-30 bg-white p-2 rounded-md shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-64">
        <h1 className="text-2xl font-bold mb-6">Upload KYC Documents</h1>

        {/* Card */}
        <div id="add-docs" className="max-w-xl bg-white shadow-lg rounded-xl p-6">
          <div className="space-y-5">
            
            <div>
              <label className="font-medium">Aadhar Card Photo</label>
              <input 
                type="file" 
                onChange={(e) => setAadhar(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="font-medium">GSTCertificate Card</label>
              <input 
                type="file" 
                onChange={(e) => setGSTCertificate(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="font-medium">FactoryAddressProof Record (Proof)</label>
              <input 
                type="file" 
                onChange={(e) => setFactoryAddressProof(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="font-medium">FactoryPhoto of Farmer</label>
              <input 
                type="file" 
                accept="image/*" 
                capture="user"
                onChange={(e) => setFactoryPhoto(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="font-medium">Fssail licence </label>
              <input 
                type="file" 
                accept="image/*" 
                capture="user"
                onChange={(e) => setFSSAILicense(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-medium mt-4"
            >
              Submit Documents
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
