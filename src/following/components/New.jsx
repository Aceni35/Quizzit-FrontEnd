import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendComment } from "../../slices/HomeSlice";

const New = ({ post }) => {
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="col-10 mind rounded my-2">
      <div className="row">
        <div className="col-12 fs-3">{post.from} just uploaded a new Quizz</div>
        <hr className="my-1" />
        <div className="col-12 fs-5">{post.postText}</div>
        <hr className="my-1" />
        <div className="row py-1">
          <div className="col-8">
            <FaRegComment
              size={30}
              color="white"
              className="ms-4"
              onClick={() => setIsComment(!isComment)}
            />
            <button
              className="btn btn-dark ms-4"
              onClick={() => {
                navigate(`/play/${post.quizId}`);
              }}
            >
              Play now
            </button>
          </div>
          <div className="col-4 d-flex align-items-center">{post.date}</div>
        </div>
        {isComment && (
          <>
            <div className="row" style={{ transition: "all 1s" }}>
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
                  onClick={() =>
                    dispatch(sendComment({ comment, postId: post._id }))
                  }
                >
                  Post
                </button>
              </div>
            </div>
            {post.comments.map((comment, index) => {
              return (
                <div className="row my-2" key={index}>
                  <div
                    className="bg-light rounded ms-3 p-1"
                    style={{ width: "auto" }}
                  >
                    <span className="bg-dark text-light p-1 rounded">
                      {comment.from}
                    </span>
                    :{comment.text}
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

export default New;
