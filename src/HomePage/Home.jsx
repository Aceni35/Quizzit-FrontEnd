import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Picks from "./components/Picks";
import PhoneNav from "../components/PhoneNav";
import { useDispatch, useSelector } from "react-redux";
import { getPlayRecords } from "../slices/HomeSlice";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const { showNav, homeLoading, playRecord } = useSelector(
    (store) => store.home
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlayRecords());
  }, []);
  if (homeLoading) {
    return (
      <div className="row">
        <div className="col-12 text-center mt-4">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        className="container-fluid"
        style={{ minHeight: "80vh", height: "auto" }}
      >
        <div className="container-lg">
          <div className="row mt-3 fs-2 ">
            <div className="col-12 p-1 bg-light rounded mt-3">
              This month most played ...
            </div>
            <Picks quizzes={playRecord.month} />
            <div className="col-12 p-1 bg-light rounded mt-3">
              Todays top picks ...
            </div>
            <Picks quizzes={playRecord.today} />
            <div className="col-12 p-1 bg-light rounded mt-3">
              Most played quizzes...
            </div>
            <Picks quizzes={playRecord.allTime} />
          </div>
        </div>
      </div>
      <footer className="bg-dark mt-4" style={{ height: "40px" }}></footer>
    </>
  );
};

export default Home;
