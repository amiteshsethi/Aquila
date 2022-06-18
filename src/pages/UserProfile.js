import styles from "../styles/settings.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addFriend, fetchUserProfile, removeFriend } from "../api";
import toast from "react-hot-toast";
import { Loader } from "../components";
import { useAuth } from "../hooks";
import userimg from "../assests/images/userimg.png";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInrogress, setrequestInrogress] = useState(false);

  const { userId } = useParams();
  const nav = useNavigate();
  const auth = useAuth();

  // console.log('user',user)
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        return nav("/");
      }
      setLoading(false);
    };
    getUser();
  }, [userId, nav]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;
    const friendIds = friends.map((friend) => friend.to_user._id);

    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      //found user is a friend
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = async () => {
    setrequestInrogress(true);
    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      toast.success("Friend removed Successfully!");
    } else {
      toast.error(response.message);
    }

    setrequestInrogress(false);
  };

  const handleAddFriendClick = async () => {
    setrequestInrogress(true);
    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success("Friend added Successfully!");
    } else {
      toast.error(response.message);
    }

    setrequestInrogress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src={userimg}
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInrogress ? "Removing Friend" : "Remove Friend"}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInrogress}
          >
            {requestInrogress ? "Adding Friend" : "Add Friend"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
