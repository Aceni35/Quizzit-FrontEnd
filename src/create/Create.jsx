import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserQuizzes, resetState } from "../slices/Createslice";
import Quizz from "../components/Quizz";
import { Spinner } from "react-bootstrap";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isGetLoading, userQuizzes } = useSelector((store) => store.create);
  useEffect(() => {
    dispatch(getUserQuizzes());
  }, []);

  const getQuizzes = (statement) => {
    const result = userQuizzes.filter((el) => el.completed === statement);
    return result;
  };

  const mapQuizzes = (data, statement) => {
    return data.map((el, index) => {
      return (
        <div
          className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center pb-3"
          key={index}
        >
          <Quizz isEdit={true} isPlay={statement} data={el} />
        </div>
      );
    });
  };

  if (isGetLoading) {
    return (
      <h1 className="text-center mt-4">
        <Spinner />
      </h1>
    );
  }

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12 d-flex justify-content-around bg-light p-2 fs-4 mt-2 rounded">
          <span>Create new quizz or edit old ones</span>
          <span>
            <button
              className="btn btn-success"
              onClick={() => {
                navigate("/createNew");
                dispatch(resetState());
              }}
            >
              Create now
            </button>
          </span>
        </div>
        <div className="col-12 bg-light mt-3 p-2 rounded fs-4">
          You're published quizzes :
        </div>
        {getQuizzes(true).length === 0 ? (
          <h4 className="my-2">no published quizzes</h4>
        ) : (
          mapQuizzes(getQuizzes(true), true)
        )}
        <div className="col-12 bg-light mt-3 p-2 rounded fs-4">
          You're unfinished quizzes :
        </div>
        {getQuizzes(false).length === 0 ? (
          <h4 className="my-2">no unfinished quizzes</h4>
        ) : (
          mapQuizzes(getQuizzes(false), false)
        )}
      </div>
    </div>
  );
};

export default Create;
