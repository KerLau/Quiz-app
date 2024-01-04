import express from "express";
//import getLeaderBoard from "../controllers/leaderboardController.js";
import {
  
  getLeaderBoardV2,
} from "../controllers/leaderboardController.js";

const router = express.Router();

//router.get("/", getLeaderBoard);
router.get("/",getLeaderBoardV2);

export default router;