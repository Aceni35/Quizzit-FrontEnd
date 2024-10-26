import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./components/Navbar";
import PhoneNav from "./components/PhoneNav";

const ProtectedRoute = () => {
  const { showNav, token } = useSelector((state) => state.home);

  if (token === null) {
    return <Login />;
  } else {
    return (
      <>
        {showNav && <PhoneNav />}
        <Navbar />
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoute;
