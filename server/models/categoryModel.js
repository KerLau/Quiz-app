import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    minLength: 2,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
