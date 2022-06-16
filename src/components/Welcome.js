import React from "react";
import styles from "../styles/welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <img alt="welcome-img" src="https://m.media-amazon.com/images/I/61h7vvsg31L._SL1000_.jpg" />
      <div className={styles.welcomeHeader}>WELCOME TO AQUILA</div>
      <span>connect and share with the people in your life.</span>
    </div>
  );
};

export default Welcome;
