import express from "express";
import {
  registerUser,
  loginUser,
  resendOTP,
  verifyOtp,
  validLogin,
  logoutUser,
  getPendingUsers,
  verifyUserByAdmin,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
// import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/resend-otp",resendOTP);
router.post("/verify-otp",verifyOtp);

// Authenticated
router.get("/validlogin",validLogin);
router.post("/logout",logoutUser);

// // Admin-only
router.get("/pending-users",getPendingUsers);
router.put("/verify/:id",verifyUserByAdmin);
router.get("/all",getAllUsers);
router.delete("/delete/:id",deleteUser);

export default router;





// router.get("/pending-users", roleCheck(["admin"]), getPendingUsers);
// router.put("/verify/:id", roleCheck(["admin"]), verifyUserByAdmin);
// router.get("/all", roleCheck(["admin"]), getAllUsers);
// router.delete("/delete/:id",roleCheck(["admin"]), deleteUser);