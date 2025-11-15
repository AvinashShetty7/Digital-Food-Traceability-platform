import { useState } from "react";
import axios from "axios";

export default function AddRawMaterial() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    location: "",
    harvestDate: "",
    expiryDate: "",
    imageUrl: null,
    qualityGrade: "",
    pricePerUnit: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert form data to FormData for file upload
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const res = await axios.post(`${API_URL}/api/rawmaterial/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Raw Material Added Successfully");
    } catch (error) {
      alert("Error adding raw material");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Add Raw Material</h1>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="quantity" placeholder="Quantity" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="unit" placeholder="Unit (kg, ton, etc.)" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="font-medium">Harvest Date</label>
        <input type="date" name="harvestDate" onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="font-medium">Expiry Date</label>
        <input type="date" name="expiryDate" onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="font-medium">Raw Material Image</label>
        <input type="file" name="imageUrl" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />

        <input name="qualityGrade" placeholder="Quality Grade (A, B, C)" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="pricePerUnit" placeholder="Price per Unit" onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="status" onChange={handleChange} className="w-full p-2 border rounded">
          <option>Available</option>
          <option>Consumed</option>
          <option>Expired</option>
        </select>

        <button
          type="submit"
          className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Add Raw Material
        </button>
      </form>
    </div>
  );
}
