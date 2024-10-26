import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendQuiz, updateQuizz } from "../../slices/Createslice";

function AskModal({ show, setShow, runValidators, type, info, tp }) {
  const handleClose = () => setShow(false);
  const { isLoading } = useSelector((store) => store.create);
  const { questions, id } = useSelector((state) => state.create);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Quizz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === "now"
            ? "Are you sure you don't want to make any further changes ?"
            : "This quizz will be saved in your account and you can finish it later, OK ?"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (type === "now") {
                runValidators();
              } else {
                if (tp === true) {
                  dispatch(
                    updateQuizz({
                      info,
                      setShow,
                      navigate,
                      completed: false,
                      questions,
                      toast,
                      id,
                    })
                  );
                } else {
                  dispatch(
                    sendQuiz({
                      questions,
                      info,
                      setShow,
                      navigate,
                      toast,
                      completed: false,
                    })
                  );
                }
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? <SpinnerOne /> : "Publish"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AskModal;

function SpinnerOne() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
