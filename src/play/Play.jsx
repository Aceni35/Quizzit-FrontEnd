import React, { useEffect } from "react";
import Quizz from "../components/Quizz";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createParty,
  getSingleQuiz,
  resetParty,
  sendPlayQuiz,
} from "../slices/PlaySlice";
import { Spinner } from "react-bootstrap";

const Play = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { quiz, isLoading } = useSelector((store) => store.play);
  useEffect(() => {
    dispatch(getSingleQuiz({ id }));
  }, []);
  useEffect(() => {
    dispatch(resetParty());
  }, []);

  if (isLoading) {
    return (
      <h1 className="text-center mt-4">
        <Spinner />
      </h1>
    );
  } else if (!isLoading && !quiz) {
    return (
      <>
        <h4 className="my-3 text-center">Quiz no longer exists :(</h4>;
        <div className="text-center">
          <button
            className="btn btn-dark p-2"
            onClick={() => {
              navigate("/following");
            }}
          >
            Go back
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12 py-2 bg-light fs-4">
          Play the "{quiz.name}" quizz
        </div>
      </div>
      <div className="row">
        <div className="col-5 col-lg-5 col-xl-3 d-flex justify-content-center">
          <Quizz data={quiz} isPlay={false} />
        </div>
        <div className="col-7 col-lg-7 col-xl-9 p-2">
          <div className="row bg-light " style={{ height: "390px" }}>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary p-4 fs-4 "
                onClick={() => {
                  navigate(`/playQuiz/${id}`);
                  dispatch(sendPlayQuiz({ id }));
                }}
              >
                Play the quizz alone
              </button>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center ">
              <button
                className="btn btn-success p-4 fs-4 "
                onClick={() => {
                  dispatch(createParty({ navigate, id }));
                }}
              >
                {" "}
                Play with friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
