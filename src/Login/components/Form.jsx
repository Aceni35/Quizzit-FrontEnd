import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLogin, sendData } from "../../slices/HomeSlice";
import { Spinner } from "react-bootstrap";

const Form = () => {
  const { login, isLoading } = useSelector((store) => store.home);
  const dispatch = useDispatch();
  const [input, setInput] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div className="row form">
      <div className="col-12 text-center mt-3 fs-3">
        {login ? "Login" : "Register"}
      </div>
      <div className="col-12 text-center">
        Username{" "}
        <input
          type="text"
          className="me-3 ms-1"
          value={input.username}
          onChange={handleChange}
          name="username"
        />
      </div>
      <div className="col-12 text-center">
        Password{" "}
        <input
          type="password"
          className="me-3 ms-1"
          value={input.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="col-12 text-center">
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(sendData(input))}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Enroll now"}
        </button>
      </div>
      <div className="col-12 text-center">
        {login ? "Don't have an account?" : "Already have an account?"}
        <span className="text-primary" onClick={() => dispatch(changeLogin())}>
          {" "}
          {login ? "Register NOW!" : "Login NOW!"}{" "}
        </span>
      </div>
    </div>
  );
};

export default Form;
