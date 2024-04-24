import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./Quiz.css";

const Quiz = ({ user }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`quiz/question/${category}`);
      const { question, answers, correctAnswer } = response.data;
      setQuestion(question);
      setAnswers(answers);
      setCorrectAnswer(correctAnswer);
      setSelectedAnswer("");
      setHasAnswered(false);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = async (answer) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    console.log({ user });
    axios
      .post("answers/", {
        userId: user._id,
        categoryName: category,
        answerText: answer,
        isCorrect: answer === correctAnswer,
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
    if (!hasAnswered) return "answer-btn";
    if (answer === correctAnswer) return "answer-btn answer-btn-correct";
    if (answer === selectedAnswer) return "answer-btn answer-btn-incorrect";
    return "answer-btn";
  };

  return (
    <div className="quiz-container">
      {loading && (
        <div className="loading-container">
          <div className="loading-message">
            <ClipLoader color="#3498db" loading={loading} size={50} />
            <p>Please wait, loading...</p>
          </div>
        </div>
      )}
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Quiz;
