import Answer from "../models/answerModel.js";

const createAnswer = async (req, res, next) => {
  try {
    const { userId, categoryId, answerText } = req.body;

    const newAnswer = new Answer({
      user: userId,
      category: categoryId,
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
