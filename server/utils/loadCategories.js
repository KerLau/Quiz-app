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
  { name: "Nature & Wildife" },
];

const loadCategories = async () => {
  try {
    //await connectDB();
    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categoriesData);
    // const categories = await Category.create(categoriesData);
    console.log("Categories loaded successfully:", categoriesData);
  } catch (error) {
    console.error("Error loading categories:", error.message);
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
