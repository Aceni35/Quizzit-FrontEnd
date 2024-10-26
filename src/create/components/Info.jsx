import React from "react";
import topics from "../../components/topics";

const Info = ({ info, setInfo }) => {
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
    <div className="row bg-light rounded" style={{ height: "340px" }}>
      <div className="col-12 text-center mt-1 fs-3">Quizz Info</div>
      <div className="col-12">
        Quizz name{" "}
        <input
          type="text"
          className="bg-light q-inp"
          value={info.name}
          onChange={handleChange}
          name="name"
        />
      </div>
      <div className="col-12">
        Quizz description{" "}
        <input
          type="text"
          className="bg-light q-inp"
          value={info.desc}
          onChange={handleChange}
          name="desc"
        />
      </div>
      <div className="col-12">
        What type of quizz is this
        <select value={info.type} onChange={handleChange} name="type">
          {topics.map((t, index) => {
            return (
              <option value={t.name} key={index}>
                {t.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-12">
        Time limit for questions{" "}
        <select value={info.time} onChange={handleChange} name="time">
          <option value={5}>5 sec</option>
          <option value={10}>10 sec</option>
          <option value={15}>15 sec</option>
          <option value={20}>20 sec</option>
          <option value={30}>30 sec</option>
        </select>
      </div>
    </div>
  );
};

export default Info;
