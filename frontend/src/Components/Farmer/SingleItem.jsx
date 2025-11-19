// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function SingleItem() {
//   const { batchCode } = useParams();
  
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [item, setItem] = useState(null);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/rawmaterial/${batchCode}`);
//         console.log(res.data.rawMaterial);
        
//         setItem(res.data.rawMaterial);
//         setStatus(res.data.rawMaterial.status);
//       } catch (error) {
//         console.log("Error fetching item", error);
//       }
//     };
//     fetchItem();
//   }, [batchCode]);

//   const updateStatus = async () => {
//     try {
//       const res = await axios.put(`${API_URL}/api/rawmaterial/update-status/${batchCode}`, {
//         status,
//       });
//       alert(res.data.message || "Status Updated");
//     } catch (err) {
//       alert("Error updating status");
//     }
//   };

//   if (!item) return <p className="p-6 text-center">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold mb-4">{item.name}</h1>

//         <img
//           src={item.imageUrl}
//           alt={item.name}
//           className="w-full h-60 object-cover rounded-lg mb-4"
//         />

//         <p className="text-gray-700 mt-2"><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
//         <p className="text-gray-700 mt-2"><strong>Price per Unit:</strong> ₹{item.pricePerUnit}</p>
//         <p className="text-gray-700 mt-2"><strong>Location:</strong> {item.location}</p>

//         <p className="text-gray-700 mt-2"><strong>Harvest Date:</strong> {item.harvestDate?.slice(0, 10)}</p>
//         <p className="text-gray-700 mt-2"><strong>Expiry Date:</strong> {item.expiryDate?.slice(0, 10)}</p>

//         <p className="text-gray-700 mt-2"><strong>Quality Grade:</strong> {item.qualityGrade}</p>

//         <div className="mt-5">
//           <label className="font-semibold">Update Status:</label>
//           <select
//             className="w-full p-2 border rounded mt-1"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Available">Available</option>
//             <option value="Consumed">Consumed</option>
//             <option value="Expired">Expired</option>
//           </select>

//           <button
//             onClick={updateStatus}
//             className="w-full mt-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//           >
//             Save Status
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SingleItem() {
  const { batchCode } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/${batchCode}`);
        setItem(res.data.rawMaterial);
        setStatus(res.data.rawMaterial.status);
      } catch (error) {
        console.log("Error fetching item", error);
      }
    };
    fetchItem();
  }, [batchCode]);

  const updateStatus = async () => {
    try {
      const res = await axios.put(`${API_URL}/api/rawmaterial/update/${batchCode}`, {
        status,
      });
      alert(res.data.message || "Status Updated");
    } catch (err) {
      alert("Error updating status");
    }
  };

  if (!item) return <p className="p-8 text-center text-gray-600 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 via-white to-green-50 p-8 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-100 transition-all">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center tracking-tight">
          {item.name}
        </h1>

        {/* Image Section */}
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
          />
          <span
            className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
              status === "Available"
                ? "bg-green-600 text-white"
                : status === "Consumed"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6">
          <p>
            <span className="font-semibold text-gray-800">Quantity:</span> {item.quantity} {item.unit}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Price per Unit:</span> ₹{item.pricePerUnit}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Location:</span> {item.location}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Quality Grade:</span> {item.qualityGrade}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Harvest Date:</span>{" "}
            {item.harvestDate?.slice(0, 10)}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Expiry Date:</span>{" "}
            {item.expiryDate?.slice(0, 10)}
          </p>
        </div>

        {/* Update Section */}
        <div className="bg-green-50 p-5 rounded-xl border border-green-100 mt-4">
          <label className="block text-gray-800 font-semibold mb-2">
            Update Status:
          </label>

          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition mb-4 bg-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">available</option>
            <option value="sold">sold</option>
            <option value="expired">expired</option>
          </select>

          <button
            onClick={updateStatus}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition-transform hover:-translate-y-0.5"
          >
            Save Status
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Batch Code: <span className="font-medium">{item.batchCode}</span>
        </p>
      </div>
    </div>
  );
}
