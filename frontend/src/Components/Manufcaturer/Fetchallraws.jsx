import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Fetchallraws() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/allraws`);

        setItems(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Raw Materials</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link to={`/singlerawdetails/${item.batchCode}`}
            key={item.batchCode}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition block"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h2 className="text-lg font-bold">{item.name}</h2>
            <h2 className="text-lg font-bold">{item.batchCode}</h2>
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Status:</span> {item.status}
            </p>

            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Price per Unit:</span> ₹
              {item.pricePerUnit}
            </p>

            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Unit:</span> {item.unit}
            </p>
          </Link>
        ))}

        {items.length === 0 && (
          <p className="text-center text-gray-600 col-span-full">
            No raw materials found.
          </p>
        )}
      </div>
    </div>
  );
}
