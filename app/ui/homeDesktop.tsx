import styles from "../../styles/HomeDesktop.module.scss";
import stylesButton from "../../styles/Button.module.scss";
import Navbar from "./navbar";
//import Button from "./button";
import Footer from "./footer";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import ArrowRight from "@/public/images/icons/arrow-right";
import axios from "axios";
import { useRouter } from "next/navigation";

// Assuming Navbar and Button are typed in their respective files
const HomeDesktop: React.FC = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [color, setColor] = useState(false);

  const router = useRouter();

  const handlePlayGame = async () => {
    const wallet = wallets[0];
    console.log("handle play game");
    try {
      if (wallet) {
        await axios.post("/api/lobby", {
          publicAddress: wallet.address,
        });
        router.push("/lobby");
      } else {
        console.log("No Wallets");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInfo}>
        {/* <div className={styles.nav}>
          <Navbar currentPage="home" />
        </div> */}
        <div className={styles.infoContainer}>
          <h1 className={styles.infoHeader}>Cosmies</h1>
          <p className={styles.infoText}>
            Crash landing on earth, these creatures spread around the globe
            looking for Adventurers to guide them.
          </p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              className={stylesButton.button}
              onMouseEnter={() => setColor(true)}
              onMouseLeave={() => setColor(false)}
              onClick={() => {
                router.push("/mint");
              }}
            >
              Mint Here
              <span className={styles.leftArrow}>
                <ArrowRight fill={color ? "orange" : "blue"} />
              </span>
            </button>
            <button
              className={stylesButton.button}
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
  );
};

export default HomeDesktop;
