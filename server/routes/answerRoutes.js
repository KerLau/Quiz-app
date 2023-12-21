import express from "express";
import createAnswer from "../controllers/answerController.js";

const router = express.Router();

router.post("/", createAnswer);

export default router;
