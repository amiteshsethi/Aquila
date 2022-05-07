import React from "react";
import styles from "../styles/Navbar.module.css";
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            className={styles.logo}
            src="https://cdn-icons-png.flaticon.com/512/2230/2230951.png"
            alt=""
          /> 
        </Link>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img
              src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1651745762~hmac=53d5990dc81209631c0049d9605b4484"
              alt=""
              className={styles.userDp}
            />
          </a>
          <spna>Amitesh</spna>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
            <li>
              <Link to="/">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
