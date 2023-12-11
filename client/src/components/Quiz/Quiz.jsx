import React from "react";
import "./Quiz.css";
const Quiz = () => {
  const question =
    " o mokrmego moimoimger mpompmds mcfir nwi  nringn in90irng i9neinrgn inoierngoinm i 9inergm";
  const answers = [
    "Charles pdsihsdonb  pneobneb ev eljo;nvje rfbv ;ojnb eve",
    "Alan Tuqopweuieqwrf i;ownovj we ojnwnjv km erknijrpn eqrv ;qeor;nv erveqorvne ring",
    "John von Neumann",
    "Ada Lovelace",
  ];
  return (
    <div className="quiz-container">
      <div className="question">{question}</div>
      <div className="answers">
        {answers.map((answer, index) => (
          <button key={index} className="answer-btn">
            {answer}
          </button>
        ))}
      </div>
      <div className="quiz-navigation">
        <button className="nav-btn">Back</button>
        <button className="nav-btn">Cancel</button>
        <button className="nav-btn">Next</button>
      </div>
    </div>
  );
};
export default Quiz;