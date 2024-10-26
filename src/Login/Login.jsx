import React, { useState } from "react";
import Form from "./components/Form";
import Moto from "./components/Moto";
import About from "./components/About";

const Abouts = [
  {
    text: "Test your knowledge. See how educated you are in different topics.Maybe you're smarter than you think...",
    name: "Test yourself",
    src: "https://cdn.theatlantic.com/thumbor/Ot_erThCQgVVk016M-nKJrG_HhE=/603x0:4203x2700/1200x900/media/img/mt/2023/01/Dumb_Questions_02/original.jpg",
  },
  {
    text: "What better way then to spend time with your friends right?Well how about also learning in the meantime",
    src: "https://media.licdn.com/dms/image/C4D12AQF2HyN6MILFGw/article-cover_image-shrink_720_1280/0/1646657644961?e=2147483647&v=beta&t=O7HBRXmp-4I1vnw3p8_2THSzNzPtA7cS76_5yrCfZrY",
    name: "Play with your friends",
  },
  {
    text: "Don't want to play others quizzes? We've got you get on and create your own quizz, why wait for others ??",
    src: "https://dataprivacymanager.net/wp-content/uploads/2021/04/5-questions-to-ask-when-considering-privacy-solution-1024x614.png",
    name: "Be a quizz maker",
  },
];
const quizzit = [
  { letter: "Q", rotate: 20 },
  { letter: "U", rotate: -20 },
  { letter: "I", rotate: 15 },
  { letter: "Z", rotate: -10 },
  { letter: "Z", rotate: 5 },
  { letter: "I", rotate: -20 },
  { letter: "T", rotate: 15 },
];

const Login = () => {
  return (
    <>
      <div className="container-lg">
        <div className="row mt-3">
          <div className="col-12 text-center">
            {quizzit.map((el) => {
              return (
                <span
                  style={{
                    transform: `rotate(${el.rotate}deg)`,
                    display: "inline-block",
                  }}
                  className="name-font mx-2"
                >
                  {el.letter}
                </span>
              );
            })}
          </div>
        </div>
        <div className="row justify-content-around Form-Add">
          <div className="col-10 col-sm-4 ">
            <Form />
          </div>
          <div className="col-10 col-sm-7 mt-4 mt-sm-1">
            <Moto />
          </div>
        </div>
      </div>
      <div
        className="container-fluid"
        style={{ background: "white", marginTop: "160px" }}
      >
        <div className="container-lg">
          <div className="row ">
            <div className="col-12 text-center display-3 mt-4">
              What is it about here ?
            </div>
            <div className="row mb-5 mt-3">
              {Abouts.map((ab) => {
                return (
                  <div className="col-12 col-sm-4 d-flex justify-content-center mt-5">
                    <About text={ab.text} name={ab.name} src={ab.src} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <footer style={{ height: "30px" }} className="bg-dark"></footer>
    </>
  );
};

export default Login;
