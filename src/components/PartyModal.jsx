import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getParty, resetParty } from "../slices/PlaySlice";
import { useNavigate } from "react-router-dom";

function PartyModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalLoading, socket: modalSocket } = useSelector(
    (store) => store.play
  );

  useEffect(() => {
    dispatch(resetParty());
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Join a party</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter party code{" "}
          <input
            type="text"
            className="q-inp"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={modalLoading}
            onClick={() => {
              dispatch(getParty({ input, navigate, modalSocket, setShow }));
            }}
          >
            {modalLoading ? <SpinnerOne /> : "Join"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PartyModal;

function SpinnerOne() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
