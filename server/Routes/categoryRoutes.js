import express from "express";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../Controller/categoryController.js";

const router = express.Router();

//create -category
router
  .route("/create-category")
  .post(requiresSignIn, isAdmin, createCategoryController);
//update category
router
  .route("/update-category/:id")
  .put(requiresSignIn, isAdmin, updateCategoryController);

//get all category
router.route("/get-category").get(categoryController);

//single-category
router.route("/single-category/:slug").get(singleCategoryController);

//delete-category
router
  .route("/delete-category/:id")
  .delete(requiresSignIn, isAdmin, deleteCategoryController);

export default router;
