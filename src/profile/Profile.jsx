import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getProfile } from "../slices/HomeSlice";
import { useNavigate, useParams } from "react-router-dom";
import ReturnPost from "../following/ReturnPost";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const point = useRef(null);
  const {
    profileLoading,
    fyp: userPosts,
    userProfile,
    username,
    canProfileLoadMore: canLoadMore,
    profileCount,
  } = useSelector((state) => state.home);
  const { name } = useParams();
  useEffect(() => {
    dispatch(getProfile({ name, profileCount: 0 }));
  }, [name]);

  useEffect(() => {
    if (!profileLoading && point != null) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting === true && canLoadMore === true) {
          dispatch(getProfile({ name, profileCount }));
        }
      });
      observer.observe(point.current);
      return () => observer.disconnect();
    }
  }, [profileLoading, canLoadMore, profileCount]);
  if (profileLoading) {
    return (
      <h1 className="text-center mt-4">
        <Spinner />
      </h1>
    );
  }

  return (
    <>
      <div className="container-lg" style={{ minHeight: "80vh" }}>
        <div className="row mt-4 bg-light rounded p-3">
          <div className="col-md-2 col-4">
            <div className="letter l-icon ms-3">
              {userProfile.username[0].toUpperCase()}
            </div>
          </div>
          <div className="col-8 display-4 d-flex align-items-center">
            {userProfile.username}
          </div>
          <div className="row mt-2 p-1 align-items-center">
            <div className="col-3 text-center">
              Followers {userProfile.followers.length}
            </div>
            <div className="col-3 text-center">
              Following {userProfile.following.length}
            </div>
            <div className="col-3 text-center">
              Quizzes {userProfile.quizzes}
            </div>
            <div className="col-3 text-center">
              {userProfile.username != username && (
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    dispatch(followUser({ user: userProfile.username }));
                  }}
                >
                  {userProfile.followers.includes(username)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-3 text-center d-lg-flex d-none bg-light rounded mt-2"
            style={{ height: "370px", flexDirection: "column" }}
          >
            <div className="col-12 text-center mt-2 fs-4">
              People User follows:
            </div>
            <div className="row justify-content-center">
              {userProfile.following.map((user) => {
                return (
                  <>
                    <div className="col-11 my-2 text-light rounded picks align-items-center py-2 d-flex justify-content-around">
                      <span className="ms-2">{user}</span>
                      <button
                        className="btn btn-light p-0 px-1 ms-3"
                        onClick={() => navigate(`/profile/${user}`)}
                      >
                        view profile
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
            {/* ends here */}
          </div>
          <div className="col-12 col-lg-9 ">
            <div className="row mx-1 my-1">
              {userPosts.map((post, index) => {
                return <ReturnPost post={post} key={index} type={"profile"} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <footer
        ref={point}
        className="bg-dark mt-3"
        style={{ height: "40px" }}
      ></footer>
    </>
  );
};

export default Profile;
