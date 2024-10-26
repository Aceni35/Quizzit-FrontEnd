import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser } from "../../slices/HomeSlice";

const UserResult = ({ name, profile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  return (
    <div className="row p-2 bg-light rounded" key={name}>
      <div className="col-12 text-center bg-light fs-3 p-2">{name}</div>
      <div className="row mt-1">
        <div className="col-6 text-center">
          <button
            className="btn btn-dark"
            onClick={() => {
              dispatch(followUser({ user: name }));
            }}
          >
            {profile.followers.includes(username)
              ? "Unfollow user"
              : "Follow User"}
          </button>
        </div>
        <div className="col-6 text-center">
          <button
            className="btn btn-dark "
            onClick={() => navigate(`/profile/${name}`)}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserResult;
