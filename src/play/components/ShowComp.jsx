import React from "react";
import { useSelector } from "react-redux";
import Intro from "./Intro";
import Question from "./Question";
import Results from "./Results";
import Lobby from "./Lobby";
import FinalResults from "./FinalResults";
import RoundResults from "./RoundResults";

const ShowComp = ({ multi }) => {
  const { show } = useSelector((store) => store.play);

  if (show === 0) {
    return <Intro />;
  } else if (show === 1) {
    return <Question multi={multi} />;
  } else if (show === 2) {
    return <Results />;
  } else if (show === 3) {
    return <Lobby />;
  } else if (show === 4) {
    return <RoundResults />;
  } else if (show === 5) {
    return <FinalResults />;
  }
};

export default ShowComp;
