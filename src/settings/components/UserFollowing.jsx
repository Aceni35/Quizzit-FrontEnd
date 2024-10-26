import React, { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowing,
  removeFollowing,
  updateFollowing,
} from "../../slices/SettingsSlice";
import { Spinner } from "react-bootstrap";

const UserFollowing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowing());
  }, []);
  const { followingLoading, following } = useSelector(
    (store) => store.settings
  );
  return (
    <div className="row p-2">
      <div className="col-12 mb-2 text-center fs-4">People who you follow </div>
      <div className="row overflow-y-scroll" style={{ height: "162px" }}>
        {followingLoading ? (
          <div className="row">
            <div className="col-12 text-center">
              <Spinner />
            </div>
          </div>
        ) : (
          following.map((x) => {
            return (
              <div className="col-4 px-1 my-1" key={x}>
                <div className="col-12 picks text-light rounded p-2 d-flex justify-content-between align-items-center">
                  <span>{x}</span>
                  <span className="me-2">
                    <CiCircleMinus
                      size={30}
                      onClick={() => {
                        dispatch(removeFollowing(x));
                        dispatch(updateFollowing(x));
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

export default UserFollowing;
