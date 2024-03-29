import styles from "../styles/home.module.css";
import { CreatePost, FriendsList, Loader } from "../components";
import { useAuth, usePosts } from "../hooks";
import Post from "../components/Post";
import Welcome from "../components/Welcome";

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      {auth.user ? (
        <>
          <div className={styles.postsList}>
            <CreatePost />

            {posts.data.map((post) => (
              <Post post={post} key={`post-${post._id}`} />
            ))}
          </div>
          <FriendsList />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
