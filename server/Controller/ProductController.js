import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ message: "name is required" });
      case !description:
        return res.status(500).send({ message: "description is required" });
      case !price:
        return res.status(500).send({ message: "price is required" });
      case !category:
        return res.status(500).send({ message: "category is required" });
      case !quantity:
        return res.status(500).send({ message: "quantity is required" });
      case !photo && photo?.size > 100000:
        return res
          .status(500)
          .send({ message: "photo is required & should be less than 1mb" });
    }
    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      err,
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Products",
      products,
    });
  } catch (err) {
    console.log(err);
    res.send(500).send({
      success: false,
      message: "Error while getting products",
      err: err.message,
    });
  }
};

//single -product
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "fetched single product",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      err: err.message,
    });
  }
};

//get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      err: err.message,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      err: err.message,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ message: "name is required" });
      case !description:
        return res.status(500).send({ message: "description is required" });
      case !price:
        return res.status(500).send({ message: "price is required" });
      case !category:
        return res.status(500).send({ message: "category is required" });
      case !quantity:
        return res.status(500).send({ message: "quantity is required" });
      case !photo && photo?.size > 100000:
        return res
          .status(500)
          .send({ message: "photo is required & should be less than 1mb" });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in updating Product",
      err,
    });
  }
};

//filter product
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    //console.log({ args: args });
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.group(err);
    res.status(400).send({
      success: false,
      message: "Error while filtering Products",
      err,
    });
  }
};

//product count
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error while counting Products",
      err,
    });
  }
};

//product list page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      err,
      message: "Error while getting product list",
    });
  }
};
