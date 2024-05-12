import styles from "../../styles/HomeDesktop.module.scss";
import Navbar from "./navbar";
//import Button from "./button";
import Footer from "./footer";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import ArrowRight from "@/public/images/icons/arrow-right";
import axios from "axios";

// Assuming Navbar and Button are typed in their respective files
const HomeDesktop: React.FC = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [color, setColor] = useState(false);

  const handlePlayGame = async () => {
    const wallet = wallets[0];
    await axios.post("http://localhost:3000/api/lobby", {
      publicAddress: wallet.address,
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInfo}>
        <div className={styles.nav}>
          <Navbar currentPage="home" />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.infoHeader}>Cosmies</h1>
          <p className={styles.infoText}>
            Crash landing on earth, these creatures spread around the globe
            looking for Adventurers to guide them.
          </p>
          <div className={styles.button}>
            <button
              className={styles.button}
              onMouseEnter={() => setColor(true)}
              onMouseLeave={() => setColor(false)}
              onClick={login}
            >
              Click Here to Play A Game
              <span className={styles.rightArrow}>
                <ArrowRight fill={color ? "green" : "blue"} />
              </span>
            </button>
            <div style={{ marginTop: "20px" }}>
              <button
                onMouseEnter={() => setColor(true)}
                onMouseLeave={() => setColor(false)}
                onClick={() => {
                  console.log("Connect here to mint a cosmie");
                }}
              >
                Mint Here
                <span className={styles.leftArrow}>
                  <ArrowRight fill={color ? "orange" : "white"} />
                </span>
              </button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button
                onMouseEnter={() => setColor(true)}
                onMouseLeave={() => setColor(false)}
                onClick={handlePlayGame}
              >
                Play a Game
                <span className={styles.leftArrow}>
                  <ArrowRight fill={color ? "green" : "black"} />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* <div className={styles.footer}>
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default HomeDesktop;
