// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateProduct() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e"; // replace with auth

//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [selectedMaterials, setSelectedMaterials] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     quantity: "",
//     unit: "kg",
//     imageUrl: null,
//     productionDate: "",
//     expiryDate: "",
//   });

//   useEffect(() => {
//     const fetchRawMaterials = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/rawmaterial/available-for-manufacturer`);
//         setRawMaterials(res.data.materials || []);
//       } catch (error) {
//         console.log("Error fetching raw materials", error);
//       }
//     };
//     fetchRawMaterials();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFile = (e) => {
//     setForm({ ...form, imageUrl: e.target.files[0] });
//   };

//   const toggleMaterial = (id) => {
//     if (selectedMaterials.includes(id)) {
//       setSelectedMaterials(selectedMaterials.filter((x) => x !== id));
//     } else {
//       setSelectedMaterials([...selectedMaterials, id]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("quantity", form.quantity);
//       fd.append("unit", form.unit);
//       fd.append("productionDate", form.productionDate);
//       fd.append("expiryDate", form.expiryDate);
//       fd.append("manufacturer", MANUFACTURER_ID);
//       fd.append("imageUrl", form.imageUrl);

//       selectedMaterials.forEach((id) => fd.append("rawMaterials", id));

//       const res = await axios.post(`${API_URL}/api/product/create`, fd);

//       alert("Product created successfully!");
//     } catch (error) {
//       console.log(error);
//       alert("Error creating product");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl space-y-5"
//       >
//         <h1 className="text-2xl font-bold text-center">Create Product</h1>

//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <select
//           name="unit"
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="kg">kg</option>
//           <option value="litre">litre</option>
//           <option value="ton">ton</option>
//           <option value="pcs">pcs</option>
//         </select>

//         <label className="font-semibold">Product Image</label>
//         <input type="file" accept="image/*" onChange={handleFile} className="w-full p-2 border rounded" />

//         <label className="font-semibold">Production Date</label>
//         <input type="date" name="productionDate" onChange={handleChange} className="w-full p-2 border rounded" />

//         <label className="font-semibold">Expiry Date</label>
//         <input type="date" name="expiryDate" onChange={handleChange} className="w-full p-2 border rounded" />

//         <h2 className="text-lg font-bold mt-4">Select Raw Materials Used</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2 border rounded">
//           {rawMaterials.map((item) => (
//             <div
//               key={item._id}
//               onClick={() => toggleMaterial(item._id)}
//               className={`p-3 border rounded cursor-pointer hover:bg-gray-200 ${
//                 selectedMaterials.includes(item._id) ? "bg-green-100 border-green-500" : ""
//               }`}
//             >
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//         >
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateProduct() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e"; // replace with auth

//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [selectedMaterials, setSelectedMaterials] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     quantity: "",
//     unit: "kg",
//     imageUrl: null,
//     productionDate: "",
//     expiryDate: "",
//   });

//   useEffect(() => {
//     const fetchRawMaterials = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/rawmaterial/available-for-manufacturer`);
//         setRawMaterials(res.data.materials || []);
//       } catch (error) {
//         console.log("Error fetching raw materials", error);
//       }
//     };
//     fetchRawMaterials();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFile = (e) => {
//     setForm({ ...form, imageUrl: e.target.files[0] });
//   };

//   const toggleMaterial = (id) => {
//     if (selectedMaterials.includes(id)) {
//       setSelectedMaterials(selectedMaterials.filter((x) => x !== id));
//     } else {
//       setSelectedMaterials([...selectedMaterials, id]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("quantity", form.quantity);
//       fd.append("unit", form.unit);
//       fd.append("productionDate", form.productionDate);
//       fd.append("expiryDate", form.expiryDate);
//       fd.append("manufacturer", MANUFACTURER_ID);
//       fd.append("imageUrl", form.imageUrl);

//       selectedMaterials.forEach((id) => fd.append("rawMaterials", id));

//       const res = await axios.post(`${API_URL}/api/product/create`, fd);

//       alert("Product created successfully!");
//     } catch (error) {
//       console.log(error);
//       alert("Error creating product");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center py-10 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-6"
//       >
//         <h1 className="text-3xl font-extrabold text-green-800 mb-3 text-center tracking-tight">
//           Create Product
//         </h1>

//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           onChange={handleChange}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         />

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           onChange={handleChange}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         />

//         <select
//           name="unit"
//           onChange={handleChange}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         >
//           <option value="kg">kg</option>
//           <option value="litre">litre</option>
//           <option value="ton">ton</option>
//           <option value="pcs">pcs</option>
//         </select>

//         <div>
//           <label className="font-semibold text-gray-700">Product Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFile}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div>
//             <label className="font-semibold text-gray-700">Production Date</label>
//             <input
//               type="date"
//               name="productionDate"
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">Expiry Date</label>
//             <input
//               type="date"
//               name="expiryDate"
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//             />
//           </div>
//         </div>

//         <div>
//           <h2 className="text-lg font-bold text-green-700 mt-6 mb-2">
//             Select Raw Materials Used
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-green-50">
//             {rawMaterials.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => toggleMaterial(item._id)}
//                 className={`p-4 border transition rounded-lg cursor-pointer group shadow-sm ${
//                   selectedMaterials.includes(item._id)
//                     ? "bg-green-200 border-green-500 ring-2 ring-green-400"
//                     : "bg-white hover:bg-green-100"
//                 }`}
//               >
//                 <p className="font-semibold text-green-900 group-hover:underline">
//                   {item.name}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {item.quantity} {item.unit}
//                 </p>
//               </div>
//             ))}
//             {rawMaterials.length === 0 && (
//               <p className="text-gray-500 text-sm col-span-full text-center">
//                 No raw materials available.
//               </p>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 mt-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow transition-all"
//         >
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateProduct() {
  const API_URL = import.meta.env.VITE_API_URL;
  const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e"; // replace with auth

  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    imageUrl: null,
    productionDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/mybuyedraws/${MANUFACTURER_ID}`);
        console.log(res.data);
        
        setRawMaterials(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      }
    };
    fetchRawMaterials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, imageUrl: e.target.files[0] });
  };

  const toggleMaterial = (id) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter((x) => x !== id));
    } else {
      setSelectedMaterials([...selectedMaterials, id]);
    }
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, id]);
    } else {
      setSelectedMaterials(selectedMaterials.filter((x) => x !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("quantity", form.quantity);
      fd.append("unit", form.unit);
      fd.append("productionDate", form.productionDate);
      fd.append("expiryDate", form.expiryDate);
      fd.append("manufacturer", MANUFACTURER_ID);
      fd.append("imageUrl", form.imageUrl);

      selectedMaterials.forEach((id) => fd.append("rawMaterials", id));

      await axios.post(`${API_URL}/api/product/create`, fd);

      alert("Product created successfully!");
    } catch (error) {
      console.log(error);
      alert("Error creating product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-green-800 mb-3 text-center tracking-tight">
          Create Product
        </h1>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        {/* Unit */}
        <select
          name="unit"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="kg">kg</option>
          <option value="litre">litre</option>
          <option value="ton">ton</option>
          <option value="pcs">pcs</option>
        </select>

        {/* Image */}
        <div>
          <label className="font-semibold text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Production Date</label>
            <input
              type="date"
              name="productionDate"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
        </div>

        {/* Raw Materials Section */}
        <div>
          <h2 className="text-lg font-bold text-green-700 mt-6 mb-2">
            Select Raw Materials Used
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-green-50">
            {rawMaterials.map((item) => (
              <label
                key={item._id}
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition shadow-sm ${
                  selectedMaterials.includes(item._id)
                    ? "bg-green-200 border-green-600"
                    : "bg-white hover:bg-green-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(item._id)}
                  onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                  className="mt-1 w-5 h-5 text-green-600 rounded"
                />

                <div>
                  <p className="font-semibold text-green-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Batch: {item.batchCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </label>
            ))}

            {rawMaterials.length === 0 && (
              <p className="text-gray-500 text-sm col-span-full text-center">
                No raw materials available.
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 mt-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow transition-all"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
