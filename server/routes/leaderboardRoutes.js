import express from "express";
import {
  getLeaderBoard,
  getLeaderBoardV2,
} from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getLeaderBoard);
router.get("/v2/", getLeaderBoardV2);

export default router;
