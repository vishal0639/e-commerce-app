import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../Controller/authController.js";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";

//router Object
const router = express.Router();

router.post("/register", registerController);
router.route("/login").post(loginController);

//forgot password
router.route("/forgot-password").post(forgotPasswordController);

router.get("/test", requiresSignIn, isAdmin, testController);

//protected user route
router.get("/user-auth", requiresSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin protected route auth
router.get("/admin-auth", requiresSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.route("/profile").put(requiresSignIn, updateProfileController);

//orders
router.route("/orders").get(requiresSignIn, getOrdersController);

//All orders
router
  .route("/all-orders")
  .get(requiresSignIn, isAdmin, getAllOrdersController);

//status-update
router
  .route("/order-status/:orderId")
  .put(requiresSignIn, isAdmin, orderStatusController);

export default router;
