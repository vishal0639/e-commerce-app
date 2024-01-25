import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "new Category created",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in category",
      err,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error while updating",
      err,
    });
  }
};

//get all categories
export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      err,
    });
  }
};

//single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got single category successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting single category",
      err,
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      err,
    });
  }
};
