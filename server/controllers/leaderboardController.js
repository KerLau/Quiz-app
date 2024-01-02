import User from "../models/userModel.js";
import Answer from "../models/answerModel.js";
import Category from "../models/categoryModel.js";

const getLeaderBoard = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const leaderBoard = {};

    for (const category of categories) {
      const users = await User.find({ role: "user" }).sort({
        correctAnswers: -1,
      });

      const categoryLeaderBoard = {};

      for (const user of users) {
        const userAnswers = await Answer.find({
          user: user._id,
          category: category._id,
        });
        categoryLeaderBoard[user.name] = userAnswers.length;
      }

      leaderBoard[category.name] = categoryLeaderBoard;
    }

    res.status(200).json({ categories: leaderBoard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    next(error);
  }
};

export default getLeaderBoard;
