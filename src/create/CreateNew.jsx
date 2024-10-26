import React, { useEffect, useState } from "react";
import { FaMinusCircle } from "react-icons/fa";
import Selected from "./components/Selected";
import { useDispatch, useSelector } from "react-redux";
import {
  addMore,
  changeSelected,
  infoShow,
  removeQuestion,
  saveQuestion,
  sendQuiz,
  updateQuizz,
} from "../slices/Createslice";
import Info from "./components/Info";
import AskModal from "./components/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "./components/DeleteModal";

const CreateNew = ({ type: tpy }) => {
  const tp = tpy === undefined ? false : tpy;
  const {
    questions,
    selected,
    showInfo,
    info: data,
    id,
    completed,
  } = useSelector((state) => state.create);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("now");
  const [showDelete, setShowDelete] = useState(false);
  const [Options, setOptions] = useState({ o1: "", o2: "", o3: "", o4: "" });
  const [Question, setQuestion] = useState("");
  const [info, setInfo] = useState({
    name: "",
    desc: "",
    time: 10,
    type: "Other",
  });
  useEffect(() => {
    setInfo(data);
  }, [id, data]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelect = (x) => {
    dispatch(changeSelected({ x, Options, Question }));
  };
  useEffect(() => {
    setQuestion(selected.question);
    setOptions({
      ...Options,
      o1: selected.options[0],
      o2: selected.options[1],
      o3: selected.options[2],
      o4: selected.options[3],
    });
  }, [selected.number, selected]);

  const runValidators = () => {
    let can = true;
    questions.forEach((q) => {
      if (q.question === "") {
        can = false;
      }
      if (q.type === 4) {
        q.options.map((q) => {
          if (q === "") {
            can = false;
          }
        });
      } else if (q.type === 2) {
        if (q.options[0] === "" || q.options[1] === "") {
          can = false;
        }
      } else if (q.type === 1) {
        if (q.options[0] === "") {
          can = false;
        }
      }
    });
    if (info.name === "" || info.desc === "") {
      can = false;
    }
    if (can) {
      const data = {
        questions,
        info,
        setShow,
        navigate,
        toast,
        completed: true,
      };
      if (tp === true) {
        dispatch(updateQuizz({ ...data, id }));
      } else {
        dispatch(sendQuiz(data));
      }
    } else {
      toast.error("please fill all the inputs");
    }
  };

  const clickButton = (data) => {
    dispatch(saveQuestion(data));
    setShow(true);
  };
  return (
    <>
      <DeleteModal show={showDelete} setShow={setShowDelete} id={id} />
      <AskModal
        show={show}
        setShow={setShow}
        runValidators={runValidators}
        type={type}
        info={info}
        tp={tp}
      />
      <div className="container-lg">
        <div className="row">
          <div className="col-12 mt-2 bg-light fs-3 rounded p-2">
            <span className="ms-2">Create your own new quizz</span>
          </div>
        </div>
        <div className="row">
          <div
            className="col-12 col-sm-4 hide-scroll"
            style={{ height: "350px", overflowY: "scroll" }}
          >
            <div className="col-12 mt-1 fs-5 text-center py-1 bg-white border border-dark border-1 rounded">
              <button
                className="btn btn-success "
                onClick={() => dispatch(addMore())}
              >
                Add more
              </button>
            </div>
            <div
              onClick={() => {
                dispatch(infoShow({ Options, Question }));
              }}
              className="col-12 p-1 mt-1 fs-5 bg-white border border-dark border-1 rounded"
            >
              <span className="ms-2">Quizz info</span>
            </div>
            {/*  */}
            {questions.map((q) => {
              return (
                <div className="col-12 d-flex justify-content-between p-1 mt-1 fs-5 bg-white border border-dark border-1 rounded">
                  <div className="col-9" onClick={() => handleSelect(q.number)}>
                    <span className="ms-2">Question {q.number}</span>
                  </div>
                  <div className="col-3 text-center">
                    <FaMinusCircle
                      size={30}
                      className="me-3"
                      onClick={() => dispatch(removeQuestion(q.number))}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 col-sm-8 p-2">
            {!showInfo ? (
              <Selected
                Options={Options}
                setOptions={setOptions}
                Question={Question}
                setQuestion={setQuestion}
              />
            ) : (
              <Info info={info} setInfo={setInfo} />
            )}
          </div>
        </div>
        <div className="row p-1">
          <div className="col-12 bg-light p-2 rounded">
            <button
              className="btn btn-outline-success mx-2"
              onClick={() => {
                setType("now");
                clickButton({ Options, Question });
              }}
            >
              Publish Quizz
            </button>
            {id != null && (
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowDelete(true)}
              >
                Delete quiz
              </button>
            )}
            {!completed && (
              <button
                className="btn btn-warning mx-2"
                onClick={() => {
                  setType("later");
                  clickButton({ Options, Question });
                }}
              >
                Finish Later
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNew;
