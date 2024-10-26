import React, { useState } from "react";
import ReturnSetting from "./components/ReturnSetting";

const options = [
  "Change password",
  "Manage your followers",
  "People you follow",
  "Log out",
];

const Settings = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-12 p-2 bg-light mt-2 fs-3 rounded">
          User settings
        </div>
      </div>
      <div className="row bg-light mt-2 py-1 ">
        <div className="col-4 d-sm-block d-none fs-5 text-center border">
          <div className="row">
            {options.map((el, index) => {
              return (
                <div
                  key={index}
                  role="button"
                  className="col-12 border py-2 pointer"
                  onClick={() => {
                    setCurrent(index);
                  }}
                >
                  {el}
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-12 col-sm-8">
          <ReturnSetting current={current} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
