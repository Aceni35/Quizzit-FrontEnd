import React from "react";
import New from "./components/New";
import Thought from "./components/Thought";

const ReturnPost = ({ post }) => {
  if (post.postType === "text") {
    return <Thought post={post} />;
  } else if (post.postType === "quiz") {
    return <New post={post} />;
  }
};

export default ReturnPost;
