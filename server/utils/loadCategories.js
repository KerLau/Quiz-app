import connectDB from "../config/db.js";
import Category from "../models/categoryModel.js";

const categoriesData = [
  { name: "General Knowledge" },
  { name: "Movies" },
  { name: "Music" },
  { name: "Science" },
  { name: "Geography" },
  { name: "Sports" },
  { name: "Food and Drink" },
  { name: "Literature" },
  { name: "Pop Culture" },
  { name: "Technology" },
  { name: "Perfect pimp" },
];

const loadCategories = async () => {
  try {
    await connectDB();
    await Category.deleteMany(); // Clear existing categories
    const categories = await Category.create(categoriesData);
    console.log("Categories loaded successfully:", categories);
  } catch (error) {
    console.error("Error loading categories:", error.message);
  } finally {
    process.exit(); // Terminate the script
  }
};

export default loadCategories;
