import React, { useEffect } from "react";
import UserResult from "./components/UserResult";
import topics from "../components/topics";
import Quizz from "../components/Quizz";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSort, getSearch } from "../slices/SearchSlice";
import UsersResult from "./components/UsersResult";
import QuzziesResults from "./components/QuzziesResults";
import { Spinner } from "react-bootstrap";

const Search = () => {
  const { topic } = useParams();
  const dispatch = useDispatch();

  const { isLoading, sortBy } = useSelector((store) => store.search);

  useEffect(() => {
    dispatch(getSearch(topic));
  }, [topic]);

  if (isLoading) {
    return (
      <h1 className="text-center mt-4">
        <Spinner />
      </h1>
    );
  }
  return (
    <div className="container">
      <div className="row ">
        <div className="col-12 bg-light p-2 fs-3 mt-3 rounded-top d-flex justify-content-between align-items-center">
          <span>Results for "Subject":</span>
          <span className="fs-5 me-3">
            Sort by{" "}
            <select
              value={sortBy}
              id=""
              onChange={(e) => dispatch(changeSort(e.target.value))}
            >
              <option value="profiles">profiles first</option>
              <option value="quizzes">quizzes first</option>
            </select>
          </span>
        </div>
        {/* results */}
        {sortBy === "profiles" ? <UsersResult /> : <QuzziesResults />}
        {sortBy != "profiles" ? <UsersResult /> : <QuzziesResults />}
      </div>
    </div>
  );
};

export default Search;
