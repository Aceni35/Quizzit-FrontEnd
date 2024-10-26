import React from "react";
import { IoBanOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePlayer, startGame } from "../../slices/PlaySlice";

const Lobby = () => {
  const { partyMembers, party, socket } = useSelector((store) => store.play);
  const username = localStorage.getItem("username");
  const isOwner = party.owner === username ? true : false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="row d-block" style={{ height: "270px" }}>
        <div className="col-12 my-2 fs-3 text-center">
          Friends Joined {partyMembers.length}/6
        </div>
        <div className="row">
          {partyMembers.map((name) => {
            return (
              <div className="col-6 col-sm-4 my-1 p-2">
                <div className="col-12 p-2 rounded bg-secondary text-light d-flex justify-content-between">
                  <span>{name}</span>
                  <span>
                    {party.owner === localStorage.getItem("username") &&
                      name != localStorage.getItem("username") && (
                        <IoBanOutline
                          size={25}
                          color="red"
                          onClick={() => {
                            const cb = () => {
                              dispatch(removePlayer(name));
                            };
                            socket.emit("kick-player", name, party._id, cb);
                          }}
                        />
                      )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-center fs-4">Party Code : {party.code}</div>
        <div className="col-6 text-center">
          {" "}
          {isOwner && (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                const cb = () => {
                  dispatch(startGame());
                };
                socket.emit("start-game", party._id, cb);
              }}
            >
              Start Game
            </button>
          )}
        </div>
        <div className="col-6 text-center">
          {isOwner ? (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                navigate("/create");
              }}
            >
              Destroy Party
            </button>
          ) : (
            <button
              className=" btn btn-outline-danger"
              onClick={() => {
                navigate("/create");
              }}
            >
              Leave party
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
