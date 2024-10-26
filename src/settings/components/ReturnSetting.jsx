import React from "react";
import ChangePassword from "./ChnagePassword";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";
import LogOut from "./LogOut";

const ReturnSetting = ({ current }) => {
  switch (current) {
    case 0:
      return <ChangePassword />;
    case 1:
      return <UserFollowers />;
    case 2:
      return <UserFollowing />;
    case 3:
      return <LogOut />;
  }
};

export default ReturnSetting;
