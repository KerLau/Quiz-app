import connectDB from "../config/db.js";
import Category from "../models/categoryModel.js";

const categoriesData = [
  { name: "General Knowledge" },
  { name: "History & Historical Figures" },
  { name: "World Capitals & Geography" },
  { name: "Space & Astronomy" },
  { name: "Health & Wellness" },
  { name: "Sports & Records" },
  { name: "Culinary Arts & Cooking" },
  { name: "Music Genres & Artists" },
  { name: "Art & Art History" },
  { name: "Nature & Wildlife" },
];

const loadCategories = async () => {
  try {
    //await connectDB();
    const existingCategories = await Category.find();

    if (existingCategories.length === 0) {
      // If no categories exist, insert them
      await Category.insertMany(categoriesData);
      console.log("Categories loaded successfully:", categoriesData);
    } else {
      console.log("Categories already exist. Skipping insertion.");
    }
  } catch (error) {
    console.error("Error loading categories:", error.message);
  }
};

export default loadCategories;
