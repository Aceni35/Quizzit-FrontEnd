import React from "react";

const OptionType = ({ Options, handleChange }) => {
  return (
    <>
      <div className="row mt-2" style={{ height: "116px" }}>
        <div className="col-12 fs-4 my-2">
          Correct answer{" "}
          <input
            type="text"
            className="q-inp bg-light"
            name="o1"
            value={Options.o1}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default OptionType;
