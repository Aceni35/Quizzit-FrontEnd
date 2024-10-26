import React from "react";
import UserResult from "./UserResult";
import { useSelector } from "react-redux";

const UsersResult = () => {
  const { profiles } = useSelector((store) => store.search);
  return (
    <>
      <div className="col-12 bg-light p-2 rounded fs-3 mt-2">Users :</div>
      {profiles.length === 0 ? (
        <h4>No profiles with this username</h4>
      ) : (
        profiles.map((profile) => {
          return (
            <div className="col-6 col-md-4 px-3 mt-2">
              <div className="row p-2">
                <UserResult name={profile.username} profile={profile} />
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default UsersResult;
