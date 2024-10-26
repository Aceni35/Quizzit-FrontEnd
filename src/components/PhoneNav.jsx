import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeNav } from "../slices/HomeSlice";
import { useNavigate } from "react-router-dom";

const map1 = [
  { name: "Quizzes", to: "/" },
  { name: "Create", to: "/create" },
  { name: "Following", to: "/following" },
];

const PhoneNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="phone-nav d-lg-none">
      <span className="x" onClick={() => dispatch(changeNav())}>
        <IoCloseCircle size={40} />
      </span>
      <div className="row mt-5 justify-content-center">
        <div className="col-12 text-center">
          <input
            type="text"
            className="rounded s-inp"
            placeholder="search profiles"
            style={{ width: "65%" }}
          />
          <span className="ms-1">
            <IoSearchCircleSharp size={45} />
          </span>
        </div>
        <div className="col-7 ">
          {map1.map((el) => {
            return (
              <div className="col-12 text-center mt-3">
                <button
                  className="btn btn-outline-light"
                  style={{ width: "80%" }}
                  onClick={() => {
                    navigate(el.to);
                    dispatch(changeNav());
                  }}
                >
                  {el.name}
                </button>
              </div>
            );
          })}
        </div>
        <div className="col-6 mt-4 text-center">
          <IoSettingsSharp
            size={50}
            cursor={"pointer"}
            onClick={() => {
              navigate("/settings");
              dispatch(changeNav());
            }}
          />
        </div>
        <div className="col-6 mt-4 text-center">
          <CgProfile
            size={50}
            onClick={() => {
              const name = localStorage.getItem("username");
              navigate("/profile/" + name);
              dispatch(changeNav());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneNav;
