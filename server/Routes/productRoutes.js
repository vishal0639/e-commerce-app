import express from "express";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../Controller/ProductController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requiresSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get Products
router.route("/get-product").get(getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product
router.put(
  "/update-product/:pid",
  requiresSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.route("/product-filters").post(productFilterController);

//produt count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.route("/search/:keyword").get(searchProductController);

//similar products
router.get("/related-products/:pid/:cid", relatedProductController);

//category wise product
router.route("/product-category/:slug").get(productCategoryController);

export default router;
