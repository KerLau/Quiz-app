import express from "express";
import getLeaderBoard from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getLeaderBoard);

export default router;
