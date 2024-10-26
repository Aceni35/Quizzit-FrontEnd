import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { sendComment, sendLike } from "../../slices/HomeSlice";

const Thought = ({ post }) => {
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="col-10 my-2 mind rounded p-3 pb-1">
      <div className="row">
        <div className="col-12 " style={{ lineHeight: "30px" }}>
          <span className="bg-dark text-light rounded p-2 m-1 ">
            {post.from}
          </span>
          {post.postText}
        </div>
        <hr className="my-1" />
        <div className="col-8 d-flex align-items-center">
          {post.likes.length}
          <FaHeart
            size={25}
            color={post.hasLiked ? "red" : "white"}
            className="ms-2"
            onClick={() => {
              if (post.isLoading) return;
              dispatch(sendLike(post._id));
            }}
          />
          <FaRegComment
            size={30}
            color="white"
            className="ms-4"
            onClick={() => setIsComment(!isComment)}
          />
        </div>
        <div className="col-3">{post.date}</div>
        {isComment && (
          <>
            <div className="row">
              <div className="col-12">
                <div className="p-icon ms-2">A</div>
                <input
                  type="text"
                  className="s-inp ms-2"
                  style={{ width: "60%" }}
                  placeholder="give your thoughts on it"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="btn btn-outline-dark ms-3"
                  onClick={() => {
                    setComment("");
                    dispatch(sendComment({ comment, postId: post._id }));
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            {post.comments.map((comment) => {
              return (
                <div className="row mt-2">
                  <div
                    className="bg-light rounded ms-3 p-1"
                    style={{ width: "auto" }}
                  >
                    <span className="bg-dark me-2 text-light p-1 rounded">
                      {comment.from}
                    </span>
                    {comment.text}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Thought;
