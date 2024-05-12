// TopButtons.tsx
import React from "react";
import Button from "./button";
import styles from "../../styles/topButtons.module.scss";

const TopButtons: React.FC = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.firstButton}>
        {/* Passing boolean props correctly */}
        <Button text="Press here to play"  linkSrc="/" />
      </div>
    </div>
  );
};

export default TopButtons;
