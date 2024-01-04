import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";
const Quiz = ({ user }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  useEffect(() => {
    fetchQuestion();
  }, []);
  useEffect(() => {
    console.log("Component renendered 1st time");
  });
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/quiz/question/${category}`
      );
      const { question, answers, correctAnswer } = response.data;
      setQuestion(question);
      setAnswers(answers);
      setCorrectAnswer(correctAnswer);
      setSelectedAnswer("");
      setHasAnswered(false);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };
  const handleAnswerSelect = async (answer) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    console.log({ user });
    axios
      .post("http://localhost:3000/answers/", {
        userId: user._id,
        categoryName: category,
        answerText: answer,
        isCorrect: answer == correctAnswer ? true : false,
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNextQuestion = () => {
    fetchQuestion();
  };
  const handleBack = () => {
    navigate("/categories");
  };
  const getButtonClass = (answer) => {
    console.log("Correct:", correctAnswer);
    console.log("Selected:", selectedAnswer);
    if (!hasAnswered) return "answer-btn";
    if (answer === correctAnswer) return "answer-btn answer-btn-correct";
    if (answer === selectedAnswer) return "answer-btn answer-btn-incorrect";
    return "answer-btn";
  };
  return (
    <div className="quiz-container">
      <div className="question">{question}</div>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            disabled={hasAnswered}
            className={getButtonClass(answer)}
            onClick={() => handleAnswerSelect(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="quiz-navigation">
        <button className="nav-btn" onClick={handleBack}>
          Back
        </button>
        <button className="nav-btn" onClick={handleBack}>
          Cancel
        </button>
        {hasAnswered && (
          <button className="nav-btn" onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export default Quiz;
