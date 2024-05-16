import React from "react";
import styles from "../../styles/RotatingBox.module.scss";

const RotatingBox = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to the lobby</h1>
      <div className={styles.cube}>
        <div className={`${styles.face} ${styles.front}`}></div>
        <div className={`${styles.face} ${styles.back}`}></div>
        <div className={`${styles.face} ${styles.left}`}></div>
        <div className={`${styles.face} ${styles.right}`}></div>
        <div className={`${styles.face} ${styles.top}`}></div>
        <div className={`${styles.face} ${styles.bottom}`}></div>
      </div>
      <h3 className={styles.footer}>Finding opponent for you</h3>
    </div>
  );
};

export default RotatingBox;
