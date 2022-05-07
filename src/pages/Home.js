import styles from "../styles/home.module.css";
import PropTypes from "prop-types";
import Comment from "../components/Comment";

const Home = ({ posts }) => {
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3011/3011270.png"
                alt="user-pic"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons.flaticon.com/png/512/210/premium/210545.png?token=exp=1651725343~hmac=0611bbd04aefe38281c9bd938ee175fd"
                  alt="likes-icon"
                />
                <span>112</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons.flaticon.com/png/512/5910/premium/5910103.png?token=exp=1651725433~hmac=e00cdda90ce5077179c0cd33da937b8f"
                  alt="comments-icon"
                />
                <span>1</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment = {comment} />
              ) )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
