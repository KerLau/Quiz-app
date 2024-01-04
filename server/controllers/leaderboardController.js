import User from "../models/userModel.js";
import Answer from "../models/answerModel.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
const getLeaderBoardV2 = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    let leaderboard;
    if (categoryId) {
      if (!mongoose.isValidObjectId(categoryId)) {
        return res.status(400).send("Invalid category ID");
      }
      const objectId = new mongoose.Types.ObjectId(categoryId);
      const categoryExists = await Category.findById(objectId);
      if (!categoryExists) {
        return res.status(404).send("Category not found");
      }
      leaderboard = await Answer.aggregate([
        {
          $match: {
            category: objectId,
            isCorrect: true,
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $group: {
            _id: "$userDetails.name",
            correctAnswersCount: { $sum: 1 },
          },
        },
        { $sort: { correctAnswersCount: -1 } },
      ]);
    } else {
      // General leaderboard for all categories
      leaderboard = await Answer.aggregate([
        {
          $match: {
            isCorrect: true,
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $group: {
            _id: "$userDetails.name",
            correctAnswersCount: { $sum: 1 },
          },
        },
        { $sort: { correctAnswersCount: -1 } },
      ]);
    }
    res.json(leaderboard);
  } catch (error) {
    console.error("Error in getLeaderBoardV2:", error);
    res.status(500).send("Internal Server Error");
  }
};
export { getLeaderBoardV2 };
