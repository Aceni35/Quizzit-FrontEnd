import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers, setQuestion, setShow } from "../../slices/PlaySlice";

const RoundResults = () => {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { socket, partyMembers, roundResults, party, question, questions } =
    useSelector((store) => store.play);
  return (
    <>
      <div>
        <h1 className=" text-center mt-3">Round {question + 1} results</h1>
        <div className="row justify-content-center">
          {roundResults.length != 0 ? (
            roundResults.map((player) => {
              return (
                <div className="col-sm-7 my-2 col-12 bg-secondary fs-4 text-white text-center rounded">
                  {player.player} + {player.points} points
                </div>
              );
            })
          ) : (
            <h4 className="text-center my-2">No one answered...</h4>
          )}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            {party.owner === username && (
              <button
                className="btn btn-outline-dark p-2"
                onClick={() => {
                  const cb = () => {
                    dispatch(setShow(0));
                    dispatch(setQuestion());
                    dispatch(clearAnswers());
                  };
                  socket.emit("next-question", partyMembers, cb);
                }}
              >
                {questions.length === question + 1
                  ? "Show final results"
                  : "Next question"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoundResults;
