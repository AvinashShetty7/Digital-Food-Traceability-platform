// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MarketPricePage() {
//   const API_KEY_GOVT = import.meta.env.VITE_API_KEY_GOVT;

//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState([]);
//   const [district, setDistrict] = useState([
//     "Bangalore",
//     "Bellary",
//     "Bidar",
//     "Chamrajnagar",
//     "Chikmagalur",
//     "Chitradurga",
//     "Hassan",
//     "Kolar",
//     "Mandya",
//     "Mysore",
//     "Shimoga",
//     "Tumkur",
//     "Madikeri(Kodagu)",
//     "Bagalkot",
//     "Belgaum",
//     "Davangere",
//     "Dharwad",
//     "Gadag",
//     "Kalburgi",
//     "Raichur",
//     "Bijapur",
//     "Koppal",
//     "Haveri",
//     "Yadgiri",
//     "Udupi",
//     "Mangalore(Dakshin Kannad)",
//     "Karwar(Uttar Kannad)",
//   ]);
//   const [market, setMarket] = useState([]);
//   const [commodity, setCommodity] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedMarket, setSelectedMarket] = useState("");
//   const [selectedCommodity, setSelectedCommodity] = useState("");
//   const d = new Date();

//   d.setMonth(d.getMonth() - 1);

//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   const oneMonthBack = `${day}\/${month}\/${year}`;


//   // Fetch data from backend
//   const handleClick = () => {
//     const params = {
//       "api-key": API_KEY_GOVT,
//       format: "json",
//       limit: "10000",
//       "filters[State]": "Karnataka",
//       "filters[Arrival_Date]": oneMonthBack,
//     };

//     if (!selectedDistrict == "") {
//       params["filters[District]"] = selectedDistrict;
//     }
//     if (!selectedMarket == "") {
//       params["filters[Market]"] = selectedMarket;
//     }
//     if (!selectedCommodity == "") {
//       params["filters[Commodity]"] = selectedCommodity;
//     }
//     axios
//       .get(
//         "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
//         {
//           params,
//         }
//       )
//       .then((res) => {
//         setData(res.data);
//         console.log(res.data);

//         const marketsList = [...new Set(res.data.records.map((r) => r.Market))];
//         setFiltered(res.data.records);
//         //  console.log(Date.now);

//         const commoditiesList = [
//           ...new Set(res.data.records.map((r) => r.Commodity)),
//         ];
//         console.log(marketsList);
//         console.log(commoditiesList);
//         setMarket(marketsList);
//         setCommodity(commoditiesList);
//       });
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4 text-green-700">
//         🌾 Current Market Prices (Daily Mandi Rates)
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         {/* District filter */}
//         <select
//           className="border p-3 rounded-lg shadow-sm"
//           value={selectedDistrict}
//           onChange={(e) => setSelectedDistrict(e.target.value)}
//         >
//           <option value="">All District</option>
//           {district.map((dst, i) => (
//             <option key={i} value={dst}>
//               {dst}
//             </option>
//           ))}
//         </select>

//         {/*markte filter */}
//         <select
//           className="border p-3 rounded-lg shadow-sm"
//           value={selectedMarket}
//           onChange={(e) => setSelectedMarket(e.target.value)}
//         >
//           <option value="">All Market</option>
//           {market.map((mt, i) => (
//             <option key={i} value={mt}>
//               {mt}
//             </option>
//           ))}
//         </select>

//         {/*commodity filter */}
//         <select
//           className="border p-3 rounded-lg shadow-sm"
//           value={selectedCommodity}
//           onChange={(e) => setSelectedCommodity(e.target.value)}
//         >
//           <option value="">All Commodity</option>
//           {commodity.map((com, i) => (
//             <option key={i} value={com}>
//               {com}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={handleClick}
//         className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Search
//       </button>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-lg rounded-lg border">
//         <table className="w-full border-collapse">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3 border">State</th>
//               <th className="p-3 border">District</th>
//               <th className="p-3 border">Market</th>
//               <th className="p-3 border">Commodity</th>
//               <th className="p-3 border">Variety</th>
//               <th className="p-3 border">Min Price</th>
//               <th className="p-3 border">Max Price</th>
//               <th className="p-3 border">Modal Price</th>
//               <th className="p-3 border">Arrival Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.length === 0 ? (
//               <tr>
//                 <td colSpan="10" className="text-center p-6 text-gray-500">
//                   No matching records founds
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((item, i) => (
//                 <tr key={i} className="border hover:bg-gray-100">
//                   <td className="p-3 border">{item.State}</td>
//                   <td className="p-3 border">{item.District}</td>
//                   <td className="p-3 border">{item.Market}</td>
//                   <td className="p-3 border font-semibold text-green-700">
//                     {item.Commodity}
//                   </td>
//                   <td className="p-3 border">{item.Variety}</td>

//                   <td className="p-3 border text-blue-700 font-semibold">
//                     ₹{item.Min_Price}
//                   </td>

//                   <td className="p-3 border text-red-700 font-semibold">
//                     ₹{item.Max_Price}
//                   </td>

//                   <td className="p-3 border text-green-700 font-bold">
//                     ₹{item.Modal_Price}
//                   </td>

//                   <td className="p-3 border">
//                     {item.Arrival_Date.replace(/\\\//g, "/")}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function MarketPricePage() {
  const API_KEY_GOVT = import.meta.env.VITE_API_KEY_GOVT;

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [district, setDistrict] = useState([
    "Bangalore",
    "Bellary",
    "Bidar",
    "Chamrajnagar",
    "Chikmagalur",
    "Chitradurga",
    "Hassan",
    "Kolar",
    "Mandya",
    "Mysore",
    "Shimoga",
    "Tumkur",
    "Madikeri(Kodagu)",
    "Bagalkot",
    "Belgaum",
    "Davangere",
    "Dharwad",
    "Gadag",
    "Kalburgi",
    "Raichur",
    "Bijapur",
    "Koppal",
    "Haveri",
    "Yadgiri",
    "Udupi",
    "Mangalore(Dakshin Kannad)",
    "Karwar(Uttar Kannad)",
  ]);
  const [market, setMarket] = useState([]);
  const [commodity, setCommodity] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const d = new Date();

  d.setMonth(d.getMonth() - 2);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  const oneMonthBack = `${day}\/${month}\/${year}`;

  // Fetch data from backend
  const handleClick = () => {
    const params = {
      "api-key": API_KEY_GOVT,
      format: "json",
      limit: "10000",
      "filters[State]": "Karnataka",
      "filters[Arrival_Date]": oneMonthBack,
      
    };

    if (!selectedDistrict == "") {
      params["filters[District]"] = selectedDistrict;
    }
    if (!selectedMarket == "") {
      params["filters[Market]"] = selectedMarket;
    }
    if (!selectedCommodity == "") {
      params["filters[Commodity]"] = selectedCommodity;
    }
    axios
      .get(
        "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
        {
          params,
        }
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);

        const marketsList = [...new Set(res.data.records.map((r) => r.Market))];
        setFiltered(res.data.records);

        const commoditiesList = [
          ...new Set(res.data.records.map((r) => r.Commodity)),
        ];
        console.log(marketsList);
        console.log(commoditiesList);
        setMarket(marketsList);
        setCommodity(commoditiesList);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border-b-4 border-green-500">
          <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl sm:text-4xl">🌾</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Market Prices Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Daily Mandi Rates - Karnataka
              </p>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-4 sm:p-6 mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Options
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* District Filter */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 District
                </label>
                <select
                  className="w-full p-3 border-2 border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 cursor-pointer"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">All Districts</option>
                  {district.map((dst, i) => (
                    <option key={i} value={dst}>
                      {dst}
                    </option>
                  ))}
                </select>
              </div>

              {/* Market Filter */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏪 Market
                </label>
                <select
                  className="w-full p-3 border-2 border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 cursor-pointer"
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                >
                  <option value="">All Markets</option>
                  {market.map((mt, i) => (
                    <option key={i} value={mt}>
                      {mt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Commodity Filter */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🌽 Commodity
                </label>
                <select
                  className="w-full p-3 border-2 border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 cursor-pointer"
                  value={selectedCommodity}
                  onChange={(e) => setSelectedCommodity(e.target.value)}
                >
                  <option value="">All Commodities</option>
                  {commodity.map((com, i) => (
                    <option key={i} value={com}>
                      {com}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center sm:justify-start">
              <button
                onClick={handleClick}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Prices
              </button>
            </div>
          </div>

          {/* Results Count */}
          {filtered.length > 0 && (
            <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 rounded-lg">
              <p className="text-sm font-semibold text-green-800">
                📊 Found {filtered.length} records
              </p>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    State
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    District
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    Market
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    Commodity
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    Variety
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    Min Price
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    Max Price
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold border-r border-green-500">
                    Modal Price
                  </th>
                  <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-bold">
                    Arrival Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center p-8 sm:p-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium text-sm sm:text-base">
                          No records found
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                          Try adjusting your filters
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-green-50 transition-colors duration-150 group"
                    >
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm text-gray-700">
                        {item.State}
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm text-gray-700 font-medium">
                        {item.District}
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm text-gray-700">
                        {item.Market}
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm font-semibold text-green-700">
                        {item.Commodity}
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm text-gray-600">
                        {item.Variety}
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-semibold">
                          ₹{item.Min_Price}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-100 text-red-800 font-semibold">
                          ₹{item.Max_Price}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 border-r border-gray-200 text-xs sm:text-sm">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-green-100 text-green-800 font-bold">
                          ₹{item.Modal_Price}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600">
                        {item.Arrival_Date.replace(/\\\//g, "/")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        {filtered.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-green-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Price Information
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    All prices are in Indian Rupees (₹) per quintal
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-medium">
                  Min Price
                </span>
                <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg font-medium">
                  Max Price
                </span>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-medium">
                  Modal
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}