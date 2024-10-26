import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCorrect } from "../../slices/Createslice";

const Option2 = ({ Options, setOptions, handleChange }) => {
  const dispatch = useDispatch();
  const CorrectChange = (e) => {
    console.log(e.target.value);
    dispatch(changeCorrect(Number(e.target.value)));
  };
  const { selected } = useSelector((store) => store.create);
  return (
    <>
      <div className="col-12 my-1 fs-5">
        Correct answer{" "}
        <select onChange={(e) => CorrectChange(e)} value={selected.correct}>
          <option value={1}>Option 1</option>
          <option value={2}>Option 2</option>
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
      </div>
    </>
  );
};

export default Option2;
