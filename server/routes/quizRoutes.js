import express from 'express';
import { getQuizQuestion, validateAnswer } from '../controllers/quizController.js';

const router = express.Router();

router.get('/question/:category', getQuizQuestion);
router.post('/validate', validateAnswer);

export default router;
