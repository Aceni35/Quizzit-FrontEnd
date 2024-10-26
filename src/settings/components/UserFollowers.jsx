import React, { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  removeFollower,
  updateFollowers,
  updateFollowing,
} from "../../slices/SettingsSlice";
import { Spinner } from "react-bootstrap";

const UserFollowers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers());
  }, []);
  const { followersLoading, followers } = useSelector(
    (store) => store.settings
  );
  return (
    <div className="row p-2">
      <div className="col-12 mb-2 text-center fs-4">People who follow you</div>
      <div className="row overflow-y-scroll" style={{ height: "162px" }}>
        {followersLoading ? (
          <div className="row">
            <div className="col-12 text-center">
              <Spinner />
            </div>
          </div>
        ) : (
          followers.map((x) => {
            return (
              <div className="col-4 px-1 my-1" key={x}>
                <div className="col-12 picks text-light rounded p-2 d-flex justify-content-between align-items-center">
                  <span>{x}</span>
                  <span className="me-2">
                    <CiCircleMinus
                      size={30}
                      onClick={() => {
                        dispatch(removeFollower(x));
                        dispatch(updateFollowers(x));
                      }}
                    />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserFollowers;
