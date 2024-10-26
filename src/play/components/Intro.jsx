import React from "react";
import { useSelector } from "react-redux";

const Intro = () => {
  const { question, questions } = useSelector((store) => store.play);
  return (
    <>
      <div>
        <div className="row" style={{ overflowX: "hidden" }}>
          <div className="col-12 my-3 fs-2 d-flex justify-content-center">
            <span className="s1">Question {question + 1}</span>
          </div>
          <div className="col-12 my-5 fs-1 d-flex justify-content-center">
            <span className="s2">{questions[question].question}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
