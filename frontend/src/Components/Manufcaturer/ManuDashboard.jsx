import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-green-800 text-white py-8 px-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-10 text-center">Dashboard</h2>

        <nav className="space-y-4">
          <Link
            to="/CreateProduct"
            className="block px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Product
          </Link>

          <Link
            to="/Fetchallraws"
            className="block px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Available Raw Materials
          </Link>

          <Link
            to="/MarketPricePage"
            className="block px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Market Price
          </Link>

          <Link
            to="#"
            className="block px-4 py-2 rounded-lg hover:bg-green-700"
          >
            My Reserved Raws
          </Link>

          <Link
            to="#"
            className="block px-4 py-2 rounded-lg hover:bg-green-700"
          >
            My Consumed Products
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
