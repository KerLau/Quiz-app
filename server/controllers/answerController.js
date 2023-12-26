import Answer from "../models/answerModel.js";
import Category from "../models/categoryModel.js";

const createAnswer = async (req, res, next) => {
  try {
    const { userId, categoryName, answerText } = req.body;
    const category = await Category.findOne({ name: categoryName }).exec();

    const newAnswer = new Answer({
      user: userId,
      category: category._id,
      answerText,
    });
    const savedAnswer = await newAnswer.save();
    res.status(201).json({
      message: "Answer created successfully",
      answer: savedAnswer,
    });
  } catch (error) {
    console.error("Error creating answer:", error.message);
    next(error);
  }
};

export default createAnswer;
