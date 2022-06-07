import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);

  const handleAddPostClick = async (post) => {
    setAddingPost(true);
    console.log('post', post)
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      toast.success("Post Created ");
    } else {
      toast.error(response.message);
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        onChange={(e) => setPost(e.target.value)}
        value={post}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? "Adding Post... " : "Add Post"}
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
