import React from "react";
import { useSelector } from "react-redux";
import Quizz from "../../components/Quizz";

const QuzziesResults = () => {
  const { quizzes } = useSelector((store) => store.search);
  return (
    <>
      <div className="col-12 bg-light p-2 rounded fs-3 mb-2 mt-2">
        Quizzes :
      </div>
      {quizzes.length === 0 ? (
        <h4>No quizzes with this title</h4>
      ) : (
        quizzes.map((el, index) => {
          return (
            <div
              className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center pb-3"
              key={index}
            >
              <Quizz
                type={el.info.type}
                name={el.name}
                about={el.info.desc}
                played={el.played}
                data={el}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default QuzziesResults;
