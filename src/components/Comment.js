import React from "react";
import styles from "../styles/home.module.css";
import PropTypes from "prop-types";


const Comment = ({comment}) => {
  return (
    // console.log(comment.likes), 
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>likes:{comment.likes.length}</span>
      </div>

      <div className={styles.postCommentContent}>
        {comment.content}
      </div>
    </div>
  );
}

Comment.propTypes = {
    comment :PropTypes.object.isRequired,
}

export default Comment;
