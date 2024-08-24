import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUsers,
  updateUserController,
  deleteUserController,
  updateUserProfileController,
  getUserProfileController,


} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// Route to get all users (protected and admin only)
router.get("/users", requireSignIn, isAdmin, getAllUsers);

// Update user details route
router.put("/users/update/:userId", requireSignIn, isAdmin, updateUserController);



// Route for deleting a user
router.delete("/users/delete/:userId", requireSignIn, isAdmin, deleteUserController);

// Get user profile route (protected)
router.get("/user/profile", requireSignIn, getUserProfileController);

// Update user profile route (protected)
router.put("/user/profile/update", requireSignIn, updateUserProfileController);


export default router;
