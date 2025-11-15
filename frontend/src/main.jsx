import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./components/Register.jsx";
import OtpVerify from "./Components/Otpverify.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import FarmerKYCPage from "./Components/Farmer/FarmerKYCPage.jsx";
import FarmerDashboard from "./Components/Farmer/FarmerDashboard.jsx";
import AddRawMaterial from "./Components/Farmer/Addrawmaterial.jsx";

const router = createBrowserRouter(
  createRoutesFromElements
  (
  <Route path="/" element={<App />}>
    <Route path="register" element={<Register/>}></Route>
    <Route path="otp" element={<OtpVerify/>}></Route>
    <Route path="login" element={<LoginPage/>}></Route>
    <Route path="FarmerKYCPage" element={<FarmerKYCPage/>}></Route>
    <Route path="FarmerDashboard" element={<FarmerDashboard/>}></Route>
    <Route path="AddRawMaterial" element={<AddRawMaterial/>}></Route>

    
  </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
