import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { correct, points, questions } = useSelector((store) => store.play);
  const navigate = useNavigate();
  return (
    <>
      <div className="col-12 my-2 text-center fs-4">
        Congrats you completed the quiz
      </div>
      <div className="col-12 fs-4 text-center">
        You got {correct}/{questions.length} questions right
      </div>
      <div className="col-12 fs-2 text-center">Your score is {points}</div>
      <div className="row">
        <div className="col-6 text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Play again
          </button>
        </div>
        <div className="col-6 text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/following")}
          >
            Back to home
          </button>
        </div>
      </div>
    </>
  );
};

export default Results;
