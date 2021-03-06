import React from "react";
import "./style.css";
const Post = ({ post, onPostDelete, onPostApply }) => {
  return (
    <>
      <div className="post shadow-card">
        <div className="descreption">{post.description}</div>
        <div className="post-buttons">
          <div className="post-button" onClick={() => onPostDelete(post)}>
            Delete
          </div>
          <div className="post-button" onClick={() => onPostApply(post)}>
            Apply
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
