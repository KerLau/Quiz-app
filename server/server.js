import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import quizRoutes from "./routes/quizRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";
import cors from "cors";
import loadCategories from "./utils/loadCategories.js";

dotenv.config();
connectDB();
loadCategories();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/user", userRoutes);

app.use("/categories", categoryRoute);

app.use("/quiz", quizRoutes);

app.use("/answers", answerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
