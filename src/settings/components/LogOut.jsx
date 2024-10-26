import React from "react";

const LogOut = () => {
  return (
    <div className="row">
      <div className="col-12 fs-4 mt-4">
        {" "}
        Are you sure you want to log out ?
        <button
          className="btn btn-danger ms-4"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default LogOut;
