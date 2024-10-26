import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../slices/SettingsSlice";
import { Spinner } from "react-bootstrap";

const ChangePassword = () => {
  const [pass, setPass] = useState({ pass: "", confirmPass: "" });
  const handleChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const { passwordLoading } = useSelector((store) => store.settings);
  return (
    <div className="row">
      <div className="col-12 text-center fs-4 mt-2"> Change username</div>
      <div className="col-12 mt-2">
        Enter old password{" "}
        <input
          type="password"
          name="pass"
          value={pass.pass}
          onChange={handleChange}
        />
      </div>
      <div className="col-12 mt-2">
        Enter new password{" "}
        <input
          type="password"
          name="confirmPass"
          value={pass.confirmPass}
          onChange={handleChange}
        />
      </div>
      <div className="col-12 mt-2 ms-3">
        <button
          className="btn btn-dark"
          onClick={() => {
            dispatch(changePassword(pass));
            setPass({ pass: "", confirmPass: "" });
          }}
          disabled={passwordLoading}
        >
          {passwordLoading ? <Spinner /> : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
