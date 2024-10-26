import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FinalResults = () => {
  const { rankings } = useSelector((store) => store.play);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1 className=" text-center mt-3">Final Results</h1>
        <div className="row justify-content-center">
          {rankings.map((player, index) => {
            return (
              <div className="col-sm-7 my-2 col-12 bg-secondary fs-4 text-white text-center rounded">
                {index + 1}. {player.name} {player.points} pts
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              className="btn btn-outline-dark p-2"
              onClick={() => navigate("/following")}
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalResults;
