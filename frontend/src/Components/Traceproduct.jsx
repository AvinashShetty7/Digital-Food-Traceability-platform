import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TraceProduct() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/trace/product/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  if (!data) return <p>Loading...</p>;

  const { product, farmers, rawMaterials, manufacturer } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.imageUrl} className="w-full max-w-md mt-4" />

      <h2 className="text-xl font-bold mt-6">Manufacturer</h2>
      <p>{manufacturer.name}</p>
      <p>{manufacturer.email}</p>

      <h2 className="text-xl font-bold mt-6">Farmers</h2>
      {farmers.map(f => (
        <div key={f._id} className="mb-3">
          <p><strong>Name:</strong> {f.name}</p>
          <p><strong>Location:</strong> {f.location}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">Raw Materials Used</h2>
      {rawMaterials.map(rm => (
        <div key={rm._id} className="mb-3">
          <p><strong>{rm.name}</strong> - {rm.quantity} {rm.unit}</p>
          <img src={rm.imageUrl} className="w-40 h-40 object-cover mt-2" />
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">Trace History</h2>
      {product.traceHistory.map(t => (
        <p key={t._id}>{t.status} - {t.timestamp}</p>
      ))}
    </div>
  );
}
