import React from "react";
import styles from "../../styles/RotatingBox.module.scss";

const RotatingBox = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to the lobby</h1>
      <div className={styles.cube}>
        <div className={`${styles.face} ${styles.front}`}>1</div>
        <div className={`${styles.face} ${styles.back}`}>2</div>
        <div className={`${styles.face} ${styles.left}`}>3</div>
        <div className={`${styles.face} ${styles.right}`}>4</div>
        <div className={`${styles.face} ${styles.top}`}>5</div>
        <div className={`${styles.face} ${styles.bottom}`}>6</div>
      </div>
      <h3 className={styles.footer}>Finding opponent for you</h3>
    </div>
  );
};

export default RotatingBox;
