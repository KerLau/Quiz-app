import mongoose from "mongoose";
import User from "./userModel.js";
import Category from "./categoryModel.js";

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    answerText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
