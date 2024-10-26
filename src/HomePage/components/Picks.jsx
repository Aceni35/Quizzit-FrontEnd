import React from "react";
import Quizz from "../../components/Quizz";
import topics from "../../components/topics";

const Picks = ({ quizzes }) => {
  return (
    <div className="col-12 mt-3">
      <div className="row justify-content-around picks rounded">
        {quizzes.length != 0 ? (
          quizzes.map((quiz, index) => {
            return (
              <div
                className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center pb-3"
                key={index}
              >
                <Quizz data={quiz} />
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center fs-5 text-light">
            No data to display{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Picks;
