import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveAnswer,
  setAnswers,
  setQuestion,
  setScore,
  setShow,
} from "../../slices/PlaySlice";

const Question = ({ multi }) => {
  const [seconds, setSeconds] = useState(10);
  const [selected, setSelected] = useState(4);
  const [answer, setAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [turn, setTurn] = useState(true);
  const username = localStorage.getItem("username");
  const { question, questions, quiz, socket, party, answers, partyMembers } =
    useSelector((store) => store.play);
  const dispatch = useDispatch();

  const checkAnswer = (playerAnswer) => {
    if (questions[question].type === 2 || questions[question].type === 4) {
      if (playerAnswer === questions[question].correct - 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (answer === questions[question].options[0]) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkAndSendAnswers = () => {
    const checkedAnswers = answers.map((answer, index) => {
      let givenPoints;
      if (index > 5) {
        givenPoints = 5;
      } else {
        givenPoints = 30 - index * 5;
      }
      if (checkAnswer(answer.answer)) {
        return { ...answer, correct: true, points: givenPoints };
      } else {
        return { ...answer, correct: false, points: 0 };
      }
    });
    dispatch(setAnswers({ answers: checkedAnswers }));
    socket.emit("send-results", checkedAnswers, partyMembers);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    setTurn(true);
    setSeconds(quiz.info.time);
  }, [question]);
  useEffect(() => {
    if (seconds === 0) {
      setTurn(false);
      if (!multi) {
        if (checkAnswer(selected)) {
          dispatch(setScore(true));
        } else {
          dispatch(setScore(false));
        }
      }
      if (multi && party.owner === username) {
        checkAndSendAnswers();
      }
      if (!multi) {
        setTimeout(() => {
          dispatch(setShow(0));
          dispatch(setQuestion());
        }, 2500);
      } else {
        setTimeout(() => {
          dispatch(setShow(4));
        }, 2000);
      }
    }
  }, [seconds]);
  return (
    <>
      <div className="col-6 fs-4 my-2 text-center">
        Question {question + 1}{" "}
      </div>
      <div className="col-6 fs-4 my-2 text-center">
        {seconds < 0 ? 0 : seconds}
      </div>
      <div className="col-12 mt-3 fs-1 my-2 text-center">
        {questions[question].question}
      </div>
      <div className="row">
        {questions[question].type === 2 || questions[question].type === 4 ? (
          <MapAnswers
            data={questions[question].options}
            count={questions[question].type}
            setSelected={setSelected}
            turn={turn}
            selected={selected}
            question={questions[question]}
            hasAnswered={hasAnswered}
            setHasAnswered={setHasAnswered}
            multi={multi}
            socket={socket}
            party={party}
          />
        ) : (
          <TypeAnswer
            answer={answer}
            setAnswer={setAnswer}
            turn={turn}
            question={questions[question]}
          />
        )}
      </div>
    </>
  );
};

export default Question;

const TypeAnswer = ({ answer, setAnswer, turn, question }) => {
  let classes = "col-12 bg-primary text-center py-2 rounded text-light";
  if (answer === question.options[0] && !turn) {
    classes = "col-12 bg-success text-center py-2 rounded text-light";
  } else if (answer != question.options[0] && !turn) {
    classes = "col-12 bg-danger text-center py-2 rounded text-light";
  }
  return (
    <div className="col-12 d-flex align-items-center">
      <div className={classes}>
        Your Answer{" "}
        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button className="btn btn-outline-light ms-2">Submit</button>
      </div>
    </div>
  );
};

const MapAnswers = ({
  data,
  count,
  setSelected,
  selected,
  turn,
  question,
  multi,
  setHasAnswered,
  hasAnswered,
  socket,
  party,
}) => {
  const dispatch = useDispatch();
  return data.map((el, index) => {
    const correct = selected === question.correct - 1;
    let classes = "col-12 bg-primary  py-2 rounded text-light";
    if (question.correct - 1 === index && !turn && !correct) {
      classes = "col-12 bg-warning py-2 rounded text-light";
    }
    if (!correct && index === selected && !turn) {
      classes = "col-12 bg-danger py-2 rounded text-light";
    }
    if (index === selected && turn) {
      classes = "col-12 bg-info py-2 rounded text-light";
    }
    if (selected === index && correct && !turn) {
      classes = "col-12 bg-success py-2 rounded text-light";
    }
    if (index < count) {
      return (
        <div
          className="col-6 d-flex align-items-center"
          onClick={() => {
            if (turn && !multi) {
              setSelected(index);
            }
            if (turn && multi && !hasAnswered) {
              setHasAnswered(true);
              setSelected(index);
              if (party.owner === localStorage.getItem("username")) {
                dispatch(
                  receiveAnswer({
                    from: localStorage.getItem("username"),
                    answer: index,
                  })
                );
              } else {
                socket.emit("send-answer", party.owner, index);
              }
            }
          }}
        >
          <div className={classes}>
            <span className="ms-3 fs-4">{el}</span>
          </div>
        </div>
      );
    }
  });
};
