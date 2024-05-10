import React from "react"; // Best practice to explicitly import React
import Carousel from "./carousel";
import styles from "../../styles/LeftSidePage.module.scss";

const LeftSidePage: React.FC = () => {
  return (
    <div className={styles.leftSidePage}>
      <div className={styles.carousel}>
        <Carousel />
      </div>
    </div>
  );
};

export default LeftSidePage;
