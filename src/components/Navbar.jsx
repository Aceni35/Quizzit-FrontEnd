import React, { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoReorderThree } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { changeNav } from "../slices/HomeSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import PartyModal from "./PartyModal";
import { io } from "socket.io-client";
import {
  addMember,
  removePlayer,
  setQuestion,
  setSocket,
  startGame,
  setShow as Show,
  receiveAnswer,
  setAnswers,
} from "../slices/PlaySlice";
import { toast } from "react-toastify";

const map1 = [
  { name: "Quizzes", path: "/" },
  { name: "Create", path: "/create" },
  { name: "Following", path: "/following" },
];
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const username = localStorage.getItem("username");
  const { party } = useSelector((store) => store.play);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      query: {
        id: username,
      },
    });
    socket.connect();
    socket.on("new-player", (name) => {
      console.log(name);
      dispatch(addMember({ name }));
    });
    socket.on("owner-left", () => {
      navigate("create");
      toast.warning("Party was destroyed");
    });
    socket.on("player-left", (name) => {
      dispatch(removePlayer(name));
    });
    socket.on("start-game", () => {
      dispatch(startGame());
    });
    socket.on("kicked", () => {
      navigate("/create");
      toast.error("You have been kicked from the party");
    });
    socket.on("next-question", () => {
      dispatch(Show(0));
      dispatch(setQuestion());
    });
    socket.on("receive-answer", (from, answer) => {
      dispatch(receiveAnswer({ from, answer }));
    });
    socket.on("round-answers", (answers) => {
      dispatch(setAnswers({ answers }));
    });
    dispatch(setSocket({ socket }));
    return () => socket.disconnect();
  }, []);

  return (
    <>
      {show && <PartyModal show={show} setShow={setShow} />}
      <div className="row nav align-items-center d-flex d-lg-none p-1">
        <span onClick={() => dispatch(changeNav())}>
          <IoReorderThree size={50} />
        </span>
      </div>
      <div className="row p-3 justify-content-around nav align-items-center d-none d-lg-flex">
        <div className="col-5">
          <div className="row justify-content-around">
            {map1.map((el, index) => {
              return (
                <div className="col-2" key={index}>
                  <button
                    onClick={() => navigate(el.path)}
                    className="btn btn-outline-light"
                  >
                    {el.name}
                  </button>
                </div>
              );
            })}
            <div className="col-2">
              <button
                onClick={() => {
                  if (party) {
                    toast.error("Please leave your current party");
                    return;
                  }
                  setShow(true);
                }}
                className="btn btn-outline-light"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="col-3 text-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search profiles"
            className="s-inp"
            onKeyPress={(e) => {
              if (search === "") return;
              if (e.key === "Enter") {
                setSearch("");
                navigate(`/search/${search}`);
              }
            }}
          />
          <IoIosSearch
            size={30}
            className="ms-1"
            role="button"
            onClick={() => {
              if (search === "") return;
              setSearch("");
              navigate(`/search/${search}`);
            }}
          />
        </div>
        <div className="col-4">
          <div className="row justify-content-around">
            <div className="col-2">
              <CgProfile
                size={35}
                cursor="pointer"
                onClick={() => {
                  const username = localStorage.getItem("username");
                  navigate(`/profile/${username}`);
                }}
              />
            </div>
            <div className="col-2">
              <IoSettingsSharp
                cursor={"pointer"}
                size={35}
                onClick={() => navigate("/settings")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
