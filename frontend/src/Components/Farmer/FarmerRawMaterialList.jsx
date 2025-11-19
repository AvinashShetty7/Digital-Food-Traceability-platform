// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function FarmerRawMaterialList() {
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/rawmaterial/myraws`);

//         setItems(res.data.materials || []);
//       } catch (error) {
//         console.log("Error fetching raw materials", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">My Raw Materials</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <Link to={`/singleItem/${item.batchCode}`}
//             key={item.batchCode}
//             className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition block"
//           >
//             <img
//               src={item.imageUrl}
//               alt={item.name}
//               className="w-full h-40 object-cover rounded-lg mb-3"
//             />

//             <h2 className="text-lg font-bold">{item.name}</h2>
//             <h2 className="text-lg font-bold">{item.batchCode}</h2>
//             <p className="text-gray-700 mt-1">
//               <span className="font-semibold">Status:</span> {item.status}
//             </p>

//             <p className="text-gray-700 mt-1">
//               <span className="font-semibold">Price per Unit:</span> ₹
//               {item.pricePerUnit}
//             </p>

//             <p className="text-gray-700 mt-1">
//               <span className="font-semibold">Unit:</span> {item.unit}
//             </p>
//           </Link>
//         ))}

//         {items.length === 0 && (
//           <p className="text-center text-gray-600 col-span-full">
//             No raw materials found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function FarmerRawMaterialList() {
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/rawmaterial/myraws`);
//         setItems(res.data.materials || []);
//       } catch (error) {
//         console.log("Error fetching raw materials", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-extrabold text-green-800 mb-10 text-center tracking-tight">
//           My Raw Materials
//         </h1>

//         {items.length === 0 ? (
//           <p className="text-center text-gray-600 text-lg mt-10">No raw materials found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {items.map((item) => (
//               <Link
//                 to={`/singleItem/${item.batchCode}`}
//                 key={item.batchCode}
//                 className="group bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all rounded-2xl overflow-hidden hover:-translate-y-2"
//               >
//                 <div className="relative">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                     {item.status}
//                   </span>
//                 </div>

//                 <div className="p-5">
//                   <h2 className="text-lg font-bold text-green-800 mb-1">
//                     {item.name}
//                   </h2>
//                   <p className="text-sm text-gray-500 mb-3">Batch Code: {item.batchCode}</p>

//                   <div className="space-y-1 text-gray-700 text-sm">
//                     <p>
//                       <span className="font-medium text-gray-800">Price per Unit:</span>{" "}
//                       ₹{item.pricePerUnit}
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-800">Unit:</span> {item.unit}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-green-50 py-3 px-5 flex justify-between items-center text-sm text-green-700 border-t border-gray-100">
//                   <span className="font-medium">View Details</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="2"
//                     stroke="currentColor"
//                     className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FarmerRawMaterialList() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // ⭐ filter state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/myraws`);
        setItems(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      }
    };
    fetchData();
  }, []);

  // ⭐ Filter logic
  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.status.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center tracking-tight">
          My Raw Materials
        </h1>

        {/* ⭐ FILTER BUTTONS */}
        <div className="flex justify-center gap-4 mb-10">
          {["all", "available","reserved","sold", "expired"].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-5 py-2 rounded-full text-sm font-medium shadow transition 
                ${
                  filter === btn
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-700 border border-green-300 hover:bg-green-100"
                }
              `}
            >
              {btn.charAt(0).toUpperCase() + btn.slice(1)}
            </button>
          ))}
        </div>

        {/* ⭐ Results */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            No raw materials found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Link
                to={`/singleItem/${item.batchCode}`}
                key={item.batchCode}
                className="group bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all rounded-2xl overflow-hidden hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow
                      ${
                        item.status === "available"
                          ? "bg-green-600"
                          : item.status === "sold"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-green-800 mb-1">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    Batch Code: {item.batchCode}
                  </p>

                  <div className="space-y-1 text-gray-700 text-sm">
                    <p>
                      <span className="font-medium text-gray-800">
                        Price per Unit:
                      </span>{" "}
                      ₹{item.pricePerUnit}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Unit:</span>{" "}
                      {item.unit}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 py-3 px-5 flex justify-between items-center text-sm text-green-700 border-t border-gray-100">
                  <span className="font-medium">View Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
