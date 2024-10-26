import React from "react";
import { useSelector } from "react-redux";

const ReturnQuestions = () => {
  const { questions } = useSelector((store) => store.play);
  return questions.map((q, index) => {
    const given = q.ans === undefined ? false : true;
    let classes = "col-12 bg-secondary text-light my-1 p-2 text-center rounded";
    if (given && q.ans === true) {
      classes = "col-12 bg-success text-light my-1 p-2 text-center rounded";
    } else if (given && q.ans === false) {
      classes = "col-12 bg-danger text-light my-1 p-2 text-center rounded";
    }
    return <div className={classes}>Question {index + 1}</div>;
  });
};

export default ReturnQuestions;
