import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY2;
const client = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Function to send a message to OpenAI API and get a trivia question
const fetchQuestions = (category) => {
  const prompt = `
    Create a quiz question for a JavaScript quiz application. 
    The category is ${category}. 
    The question should be fact-based and have four answers.
    Include one correct answer and mark it in the 'correctAnswer' field.
    Format the response as a valid JSON object with the following structure:
    {
      "question": "Question here",
      "answers": ["A: ...", "B: ...", "C: ...", "D: ..."],
      "correctAnswer": ""
    }
  `;
  return client
    .post("/engines/gpt-3.5-turbo-instruct/completions", {
      // Updated to the correct model
      prompt,
      max_tokens: 100,
      temperature: 0.5,
    })
    .then((resp) => resp.data.choices[0].text.trim())
    .catch((error) => console.log(error));
};

export const getQuizQuestion = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchQuestions(category);
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching question from OpenAI" });
  }
};

export const validateAnswer = (req, res) => {
  const { userAnswer, correctAnswer } = req.body;
  const isCorrect = userAnswer === correctAnswer;
  res.json({ isCorrect });
};
