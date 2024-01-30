import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import OrderModel from "../models/OrderModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();
//payment gatway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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
      message: "Error while getting product photo",
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

//search Product
export const searchProductController = async (req, res) => {
  try {
    console.log("search");
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error in searching Product",
      err,
    });
  }
};

//similar product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error while getting similar Product",
      err,
    });
  }
};

//get product by category
export const productCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await CategoryModel.findOne({ slug });
    const products = await ProductModel.find({ category })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Fetched products by category",
      products,
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error in fetching product by category",
      err,
    });
  }
};

//braintree token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//payment
export const braintreePaymentsController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      function (err, results) {
        if (results) {
          const order = new OrderModel({
            products: cart,
            payment: results,
            buyer: req.user.id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
