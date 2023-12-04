import connectDB from "../config/db.js";
import Category from "../models/categoryModel.js";

const categoriesData = [
  { name: "General Knowledge about Antonio", order: 1 },
  { name: "History & Historical Figures", order: 2 },
  { name: "World Capitals & Geography", order: 3 },
  { name: "Space & Astronomy", order: 4 },
  { name: "Health & Wellness", order: 5 },
  { name: "Sports & Records", order: 6 },
  { name: "Culinary Arts & Cooking", order: 7 },
  { name: "Music Genres & Artists", order: 8 },
  { name: "Art & Art History", order: 9 },
  { name: "Nature & Wildife", order: 10 },
];

const loadCategories = async () => {
  try {
    // await connectDB();
    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categoriesData);
    // const categories = await Category.create(categoriesData);
    console.log("Categories loaded successfully:", categoriesData);
  } catch (error) {
    console.error("Error loading categories:", error.message);
  } finally {
    process.exit(); // Terminate the script
  }
};
// async function loadCategories() {
//   try {
//     // await connectDB();
//     // console.log("Loading categories...");
//     await Category.deleteMany(); // Clear existing categories

//     for (const categoryData of categoriesData) {
//       // Check if the category with the same name already exists
//       const existingCategory = await Category.findOne({
//         name: categoryData.name,
//       });

//       if (!existingCategory) {
//         // If the category doesn't exist, create a new one
//         const newCategory = new Category(categoryData);
//         await newCategory.save();
//         console.log(`Category '${categoryData.name}' added to the database.`);
//       } else {
//         console.log(
//           `Category '${categoryData.name}' already exists in the database. Skipping...`
//         );
//       }
//     }

//     console.log("Categories loaded successfully.");

//     // Close MongoDB connection...
//   } catch (error) {
//     console.error("Error loading categories:", error);
//   }
// }

export default loadCategories;
