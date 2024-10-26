import React, { useEffect, useState } from "react";
import ShowComp from "./components/ShowComp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleQuiz,
  resetParty,
  resetPlayState,
  setShow,
} from "../slices/PlaySlice";
import ReturnQuestions from "./components/ReturnQuestions";
import ReturnRankings from "./components/ReturnRankings";
import axios from "axios";

const RecordPlay = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.post(
      `http://localhost:5000/api/recordPlay`,
      {
        quizId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(resp.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const Alone = ({ multi: m }) => {
  const { id: gId } = useParams();
  const multi = m === undefined ? false : m;
  const dispatch = useDispatch();
  const {
    isQuizLoading,
    question,
    points,
    started,
    party,
    socket,
    roundResults,
  } = useSelector((store) => store.play);
  const LeavePage = () => {
    if (!party) return;
    const name = localStorage.getItem("username");
    if (name === party.owner) {
      socket.emit("owner-left", party._id);
    } else {
      socket.emit("player-left", party._id);
    }
    dispatch(resetParty());
  };
  useEffect(() => {
    RecordPlay(gId);
    return () => {
      LeavePage();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", LeavePage);
    return () => window.removeEventListener("beforeunload", LeavePage);
  }, []);

  useEffect(() => {
    if (multi && !started) return;
    dispatch(resetPlayState());
  }, []);

  useEffect(() => {
    if (multi && !started) return;
    if (!isQuizLoading) {
      setTimeout(() => {
        dispatch(setShow(1));
      }, 3500);
    }
  }, [isQuizLoading, question, started]);

  useEffect(() => {
    if (multi && party === null) return;
    let id;
    if (multi) {
      id = party.gameId;
    } else {
      id = gId;
    }
    dispatch(getSingleQuiz({ id, type: 1 }));
  }, [gId, party]);
  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-3 p-2">
          <div className="row bg-light">
            <div className="col-12 text-center my-2 mb-0 fs-4">
              Score {points}
            </div>
            <div
              className="col-12 p-1 hide-scroll"
              style={{ height: "200px", overflowY: "scroll" }}
            >
              {multi ? <ReturnRankings /> : <ReturnQuestions />}
            </div>
          </div>
        </div>
        <div className="col-9 px-4 ">
          <div
            className="row bg-light rounded mt-2"
            style={{ height: "380px" }}
          >
            {isQuizLoading ? (
              <h2 className="text-center mt-3">Loading ...</h2>
            ) : (
              <ShowComp multi={multi} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alone;
