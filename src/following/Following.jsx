import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "./components/Status";
import { getFyp, setCount } from "../slices/HomeSlice";
import ReturnPost from "./ReturnPost";
import { Spinner } from "react-bootstrap";

const Following = () => {
  const { fyp, fypLoading, canLoadMore, count } = useSelector(
    (store) => store.home
  );
  const dispatch = useDispatch();

  const point = useRef(null);

  useEffect(() => {
    dispatch(getFyp(0));
    dispatch(setCount());
  }, []);

  useEffect(() => {
    if (!fypLoading && point != null) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting === true && canLoadMore === true) {
          console.log(count);
          dispatch(getFyp(count));
        }
      });
      observer.observe(point.current);
      return () => observer.disconnect();
    }
  }, [fypLoading, canLoadMore, count]);

  if (fypLoading) {
    return (
      <h1 className="text-center">
        <Spinner />
      </h1>
    );
  }
  return (
    <>
      <div
        className="container-lg  mt-3 rounded"
        style={{ minHeight: "85vh", height: "auto" }}
      >
        <div className="row ms-2">
          <Status />
        </div>
        {fyp != null
          ? fyp.map((post) => {
              return (
                <div className="row ms-2 my-1" key={post._id}>
                  <ReturnPost post={post} />
                </div>
              );
            })
          : "Loading ...."}
      </div>
      <footer
        ref={point}
        className="bg-dark"
        style={{ height: "40px" }}
      ></footer>
    </>
  );
};

export default Following;
