import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCorrect } from "../../slices/Createslice";

const Options4 = ({ Options, setOptions, handleChange }) => {
  const { selected } = useSelector((store) => store.create);
  const dispatch = useDispatch();
  return (
    <>
      <div className="col-12 my-1 fs-5">
        Correct answer{" "}
        <select
          value={selected.correct}
          onChange={(e) => {
            dispatch(changeCorrect(e.target.value));
          }}
        >
          <option value={1}>Option 1</option>
          <option value={2}>Option 2</option>
          <option value={3}>Option 3</option>
          <option value={4}>Option 4</option>
        </select>
      </div>
      <div className="row mt-2" style={{ height: "116px" }}>
        <div className="col-6">
          <span>Option 1:</span>
          <input
            type="text"
            className="q-inp bg-light"
            value={Options.o1}
            name="o1"
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          Option 2:{" "}
          <input
            type="text"
            className="q-inp bg-light"
            value={Options.o2}
            name="o2"
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          Option 3:{" "}
          <input
            type="text"
            className="q-inp bg-light"
            value={Options.o3}
            name="o3"
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          Option 4:{" "}
          <input
            type="text"
            className="q-inp bg-light"
            value={Options.o4}
            name="o4"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Options4;
