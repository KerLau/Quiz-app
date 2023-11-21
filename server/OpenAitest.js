import axios from "axios";
import dotenv from "dotenv";
import fs from "fs/promises"; // Using promise-based fs module
import readline from "readline";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY2;
console.log("Api key:", apiKey);
const client = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});

// Function to send a message to OpenAI API
async function sendMessage(message) {
  const params = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: message },
    ],
  };
  try {
    const response = await client.post("/chat/completions", params);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error sending message to OpenAI API:",
      error.response?.data || error.message
    );
    return null;
  }
}

// Function to parse the response from OpenAI API into a question object
function parseResponseToObject(response) {
  const [question, ...answers] = response
    .split("\n")
    .filter((line) => line.trim() !== "");
  const correctAnswer = answers.find((answer) => answer.includes("*"));
  if (!correctAnswer) {
    console.error("No correct answer identified.");
    return null;
  }
  return {
    question: question.trim(),
    answers: answers.map((answer) => answer.replace("*", "").trim()),
    correctAnswer: correctAnswer.replace("*", "").trim(),
  };
}

// Function to save trivia data to a JSON file
async function saveToJson(data, filename = "trivia_results.json") {
  try {
    let existingData = [];
    try {
      const fileData = await fs.readFile(filename, "utf8");
      existingData = JSON.parse(fileData);
    } catch (err) {
      // File may not exist yet, which is fine
    }
    existingData.push(data);
    const jsonString = JSON.stringify(existingData, null, 2);
    await fs.writeFile(filename, jsonString);
    console.log(`Saved trivia data to ${filename}`);
  } catch (err) {
    console.error("Error writing to file:", err);
  }
}

// Function to fetch a trivia question, present it to the user, and collect their answer
async function fetchTriviaQuestion() {
  const promptMessage =
    "Generate a question with 4 possible answers, indicating the correct one with an asterisk. Be creative";
  const response = await sendMessage(promptMessage);
  if (response) {
    const parsedQuestion = parseResponseToObject(response);
    if (!parsedQuestion) return;

    // Log the generated question and answer options
    console.log("Question:", parsedQuestion.question);
    parsedQuestion.answers.forEach((answer, index) => {
      console.log(`${index + 1}: ${answer}`);
    });

    // Collect user's answer through readline
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Your answer (number): ", async (userAnswer) => {
      const userAnswerIndex = parseInt(userAnswer);
      let result = {
        question: parsedQuestion.question,
        userAnswer: userAnswer,
        correctAnswer: parsedQuestion.correctAnswer,
        isCorrect: false,
      };

      // Check if the user's answer is valid and evaluate correctness
      if (
        !isNaN(userAnswerIndex) &&
        userAnswerIndex >= 1 &&
        userAnswerIndex <= parsedQuestion.answers.length
      ) {
        result.isCorrect =
          parsedQuestion.answers[userAnswerIndex - 1] ===
          parsedQuestion.correctAnswer;
        console.log(
          result.isCorrect
            ? "Correct!"
            : `Wrong! The correct answer was: ${parsedQuestion.correctAnswer}`
        );
      } else {
        console.log("Invalid input. Please enter a valid number.");
      }

      // Save the result to a JSON file
      await saveToJson(result);
      rl.close();
    });
  }
}

// Trigger the trivia fetching and answering process
fetchTriviaQuestion();
