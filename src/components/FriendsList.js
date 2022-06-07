import { useAuth } from "../hooks";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";

const FriendsList = () => {

  const auth = useAuth();
  const { friendships = [] } = auth.user;

  return (

    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friendships && friendships.length === 0 && (
          <div className={styles.noFriends}>No friends found </div>
      )}
      
      {friendships && friendships.map((friend) => (
        <div key={`friend-${friend._id}`}>
          <Link className={styles.friendsItem} to={`/user/${friend._id}`}>

            <div className={styles.friendsImg}>
                <img src="" alt ='user-img' />
            </div>

            <div className={styles.friendsName}>{friendships.to_user.email}</div>
          </Link>
        </div>
     )) }
    </div>

  );}

export default FriendsList;