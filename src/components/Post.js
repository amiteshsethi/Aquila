import React, { useState } from "react";
import styles from "../styles/home.module.css";
import Comment from "../components/Comment";
import { Link } from "react-router-dom";
import { usePosts } from "../hooks";
import toast from "react-hot-toast";
import { createComment, togglelike } from "../api";
import userimg from "../assests/images/userimg.png";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  // const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      // setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        toast.success("comment Added");
      } else {
        toast.error(response.message);
      }
      // setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await togglelike(post._id, "Post");

    if(response.success){
        if(response.data.deleted){
            toast.success('Unliked')
        }
        else{
            toast.success('liked')
        }
    } else {
        toast.error(response.message)
    }
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src={userimg}
            alt="user-pic"
          />
          <div>
            {/*  new v6 way to passing info through link   */}
            <Link
              to={`/user/${post.user._id}`}
              state={{
                user: post.user,
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                alt="likes-icon"
              />
            </button>

            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
