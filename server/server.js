import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoute.js"; // Import the category routes
import cors from "cors";
import loadCategories from "./utils/loadCategories.js";

dotenv.config();
connectDB();
loadCategories();

const app = express();
const port = process.env.PORT || 6969;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});
// Use the user routes
app.use("/user", userRoutes);

// Use the category routes
app.use("/categories", categoryRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Note: Removed the "loadCategories" from the app.use() middleware stack
