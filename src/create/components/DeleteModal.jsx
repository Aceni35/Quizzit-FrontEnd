import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz } from "../../slices/Createslice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DeleteModal({ show, setShow, id }) {
  const handleClose = () => setShow(false);
  const { deleteLoading } = useSelector((store) => store.create);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Quizz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={deleteLoading}
            onClick={() => {
              dispatch(deleteQuiz({ id, navigate, toast }));
            }}
          >
            {deleteLoading ? <SpinnerOne /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;

function SpinnerOne() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
