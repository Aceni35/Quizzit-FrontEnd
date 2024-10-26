import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import topics from "./topics";
import { useDispatch } from "react-redux";
import { setEditData } from "../slices/Createslice";
import { resetParty } from "../slices/PlaySlice";

const Quizz = ({ isEdit, isPlay, data }) => {
  const { name, played } = data;
  const about = data.info.desc;
  const { type } = data.info;
  const dispatch = useDispatch();
  let Edit = isEdit ? true : false;
  let Play = isPlay === undefined ? true : isPlay;

  const findSrc = () => {
    const topic = topics.find((tp) => tp.name === type);
    return topic.src;
  };

  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem", height: "410px" }} className="mt-3 ">
      <Card.Img variant="top" src={findSrc()} draggable={false} />
      <Card.Body>
        <Card.Title>{name === "" ? "Unfinished Quizz" : name}</Card.Title>
        <Card.Text className="fs-6" style={{ height: "100px" }}>
          {about}
          <span className="d-block mt-2">
            <strong>Times played: {played}</strong>
          </span>
        </Card.Text>
        <div className="row">
          {Play && (
            <div className="col-6">
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(resetParty());
                  navigate(`/play/${data._id}`);
                }}
              >
                Play now
              </Button>
            </div>
          )}
          {Edit && (
            <div className="col-6">
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setEditData(data));
                  console.log(data);
                  navigate("/editQuiz");
                }}
              >
                Edit quizz
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Quizz;
