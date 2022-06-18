import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { searchUsers } from "../api";
import userimg from "../assets/userimg.png";

function Navbar() {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();

  useEffect(() => {
    const fetchusers = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };
    if (searchText.length > 2) {
      fetchusers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            className={styles.logo}
            src="https://m.media-amazon.com/images/I/61h7vvsg31L._SL1000_.jpg"
            alt=""
          />
        </Link>
      </div>

      {auth.user && (
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
                      <div
                        onClick={() => {
                          setResults([]);
                          setSearchText("");
                        }}
                      >
                        <img src={userimg} alt="user-img" />
                        <span>{user.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons.flaticon.com/png/512/552/premium/552909.png?token=exp=1655380041~hmac=6da438a0577f6b687b2fc6cf2bb62640"
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
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://amiteshsethi.github.io/Resume/"
                  >
                    Developer
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/amiteshsethi?tab=repositories"
                  >
                    Github
                  </a>
                </li>

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
