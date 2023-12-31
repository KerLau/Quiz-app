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
const getTriviaQuestionFromOpenAI = async (category) => {
  const prompt = `Create a trivia question about ${category} with four multiple-choice answers. Make sure that one answer is 100% true. Ask unique questions and always different ones. Indicate the correct answer with an asterisk.`;
  const fetchQuestions = async () => {
    const response = await client.post(
      "/engines/text-davinci-003/completions",
      {
        // Updated to the correct model
        prompt,
        max_tokens: 100,
        temperature: 0.5,
      }
    );
    if (response.data.choices[0].text.split("\n").length > 4) {
      return response.data.choices[0].text;
    } else {
      await fetchQuestions();
    }
  };
  try {
    return await fetchQuestions();
  } catch (error) {
    console.log("Error getting trivia question: ", error);
    console.error(
      "Error sending message to OpenAI API:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const parseResponseToObject = (response) => {
  const [question, ...answers] = response
    .split("\n")
    .filter((line) => line.trim() !== "");
  const correctAnswer = answers
    .find((answer) => answer.includes("*"))
    .replace("*", "")
    .trim();
  return {
    question: question.trim(),
    answers: answers.map((answer) => answer.replace("*", "").trim()),
    correctAnswer,
  };
};

export const getQuizQuestion = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await getTriviaQuestionFromOpenAI(category);
    const parsedData = parseResponseToObject(data);
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
