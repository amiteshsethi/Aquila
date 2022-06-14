import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { searchUsers } from "../api";

function Navbar() {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();


  useEffect(() => {
    const fetchusers = async () => {
      const response = await searchUsers(searchText)
      if (response.success){
        setResults(response.data.users)
      }
    }
    if(searchText.length > 2){
      fetchusers()
    } else {
      setResults([])
    }
  },[searchText])

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            className={styles.logo}
            src="https://i.pinimg.com/736x/74/14/0d/74140da6f54f5f34eafc0c9d45ef8222.jpg"
            alt=""
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/7767/7767162.png"
          alt="search-icon"
        />
        <input
          placeholder="search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1652428366~hmac=f0cb04af19ed70c17f538d6f79cdbeec"
                      alt="user-img"
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1652428366~hmac=f0cb04af19ed70c17f538d6f79cdbeec"
                alt="user_img"
                className={styles.userDp}
              />
            </Link>
            <spna>{auth.user.name}</spna>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Logout</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/Signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
