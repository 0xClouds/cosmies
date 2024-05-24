import React, { useState } from "react";
import styles from "../../styles/RotatingBox.module.scss";
import { useRouter } from "next/navigation";
import ArrowRight from "@/public/images/icons/arrow-right";

interface RotatingBoxProps {
  title: string | undefined;
  footer: string | undefined;
}

const RotatingBox: React.FC<RotatingBoxProps> = ({ title, footer }) => {
  const [color, setColor] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    router.push("/home");
  };

  if (!title) {
    title = "Welcome to the lobby!";
  }
  if (!footer) {
    footer = "Finding an opponent for you . . .";
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{title}</h1>
      <div className={styles.cube}>
        <div className={`${styles.face} ${styles.front}`}>1</div>
        <div className={`${styles.face} ${styles.back}`}>2</div>
        <div className={`${styles.face} ${styles.left}`}>3</div>
        <div className={`${styles.face} ${styles.right}`}>4</div>
        <div className={`${styles.face} ${styles.top}`}>5</div>
        <div className={`${styles.face} ${styles.bottom}`}>6</div>
      </div>
      <div>
        <button
          className={styles.button}
          onMouseEnter={() => setColor(true)}
          onMouseLeave={() => setColor(false)}
          onClick={handleClick}
        >
          Back to the Home Page
          <span className={styles.leftArrow}>
            <ArrowRight fill={color ? "green" : "black"} />
          </span>
        </button>
      </div>
      <h3 className={styles.footer}>{footer}</h3>
    </div>
  );
};

export default RotatingBox;
