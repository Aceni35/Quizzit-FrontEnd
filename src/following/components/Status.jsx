import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTextPost } from "../../slices/HomeSlice";
import MySpinner from "../../components/Spin";

const Status = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { isSendLoading } = useSelector((store) => store.home);

  return (
    <div className="col-6 mt-3 mind rounded p-3">
      <div className="p-icon">A</div>
      <input
        type="text"
        className="ms-3 m-input rounded"
        placeholder="say whats on your mind"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="btn btn-outline-dark ms-4"
        onClick={() => {
          dispatch(createTextPost(input));
          setInput("");
        }}
      >
        {isSendLoading ? <MySpinner /> : "Send"}
      </button>
    </div>
  );
};

export default Status;
