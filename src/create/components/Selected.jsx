import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Options4 from "./Options4";
import Option2 from "./Option2";
import { changeNumber, changeType } from "../../slices/Createslice";
import OptionType from "./OptionType";

const Selected = ({ Options, setOptions, Question, setQuestion }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setOptions({ ...Options, [e.target.name]: e.target.value });
  };
  const { questions } = useSelector((store) => store.create);

  const handleOptionChange = (e) => {
    dispatch(changeType(e.target.value));
  };

  const { selected } = useSelector((store) => store.create);
  return (
    <div className="row bg-light rounded" style={{ height: "340px" }}>
      <div className="col-12 fs-4 my-2 text-center">
        Question
        <select
          value={selected.number}
          onChange={(e) =>
            dispatch(
              changeNumber({
                changing: selected.number,
                forced: Number(e.target.value),
                Options,
                Question,
              })
            )
          }
        >
          {Array.from({ length: questions.length }).map((_, index) => {
            return <option value={index + 1}>{index + 1}</option>;
          })}
        </select>
      </div>
      <div className="col-12 my-1 fs-5">
        Question type :{" "}
        <select
          name=""
          id=""
          value={selected.type}
          onChange={handleOptionChange}
        >
          <option value={2}>2 options</option>
          <option value={4}>4 options</option>
          <option value={1}>Type answer</option>
        </select>
      </div>
      <div className="col-12">
        Your Question :{" "}
        <input
          type="text"
          className="q-inp bg-light"
          value={Question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      {selected.type === 2 && (
        <Option2
          Options={Options}
          setOptions={setOptions}
          handleChange={handleChange}
        />
      )}
      {selected.type === 4 && (
        <Options4
          Options={Options}
          setOptions={setOptions}
          handleChange={handleChange}
        />
      )}
      {selected.type === 1 && (
        <OptionType
          Options={Options}
          setOptions={setOptions}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default Selected;
