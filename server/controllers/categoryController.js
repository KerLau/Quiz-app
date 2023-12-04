import Category from "../models/categoryModel.js";

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error categories:", error.message);
    next(error);
  }
};

export default getCategories;
