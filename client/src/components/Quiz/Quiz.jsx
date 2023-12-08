import React from 'react';
import './Quiz.css';

const Quiz = () => {
   
    const question = "Who is known as the father of computers?";
    const answers = ["Charles Babbage", "Alan Turing", "John von Neumann", "Ada Lovelace"];

    return (
        <div className="quiz-container">
            <h1 className="quiz-header">QUIZ</h1>
            <div className="question">{question}</div>
            <div className="answers">
                {answers.map((answer, index) => (
                    <button key={index} className="answer-btn">{answer}</button>
                ))}
            </div>
            <div className="quiz-navigation">
                <button className="nav-btn">Back</button>
                <button className="nav-btn">Next</button>
                <button className="nav-btn">Cancel</button>
            </div>
        </div>
    );
};

export default Quiz;
