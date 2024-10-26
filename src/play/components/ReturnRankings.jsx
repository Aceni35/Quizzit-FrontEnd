import React from "react";
import { useSelector } from "react-redux";

const ReturnRankings = () => {
  const { rankings } = useSelector((store) => store.play);
  return rankings.map((person, index) => {
    return (
      <div className="p-2 my-1 bg-secondary text-white">
        {index + 1}. {person.name} {person.points} pts
      </div>
    );
  });
};

export default ReturnRankings;
