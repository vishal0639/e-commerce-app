import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../Controller/authController.js";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";

//router Object
const router = express.Router();

router.post("/register", registerController);
router.route("/login").post(loginController);

router.get("/test", requiresSignIn, isAdmin, testController);
export default router;
