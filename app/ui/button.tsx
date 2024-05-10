import styles from "../../styles/Button.module.scss";
import ArrowRight from "../../public/images/icons/arrow-right";
import OpenSea from "../../public/images/icons/opensea";
import { useState } from "react";
import Link from "next/link"; // Note: This 'Link' import appears to be unused.

interface ButtonProps {
  text: string;
  linkSrc: string;
}

const Button: React.FC<ButtonProps> = ({ text, linkSrc }) => {
  const [color, setColor] = useState(false); // Standard convention is to start boolean state names with lowercase

  return (
    <div>
      <a href={linkSrc}>
        <button
          className={styles.button}
          onMouseEnter={() => setColor(true)}
          onMouseLeave={() => setColor(false)}
        >
          {text}
          <span className={styles.rightArrow}>
            <ArrowRight fill={color ? "white" : "black"} />
          </span>
        </button>
      </a>
    </div>
  );
};

export default Button;
