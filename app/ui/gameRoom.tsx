import styles from "../../styles/GameRoom.module.scss";
import stylesButton from "../../styles/Button.module.scss";

import { useState } from "react";
import ArrowRight from "@/public/images/icons/arrow-right";

interface GameRoomProps {
  roomName: string | null;
  wallet: string;
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  lifeAmount: number;
  enemyLife: number;
}

const GameRoom: React.FC<GameRoomProps> = ({
  roomName,
  wallet,
  message,
  setMessage,
  sendMessage,
  lifeAmount,
  enemyLife,
}) => {
  const [color, setColor] = useState(false);
  const player = "jambi";
  const cosmieActions = {
    jambi: ["Tackle", "Evade", "Shield", "Ice Punch"],
    Glacepom: ["Tackle", "Evade", "Shield", "Fire Kick"],
    Suburaku: ["Tackle", "Evade", "Shield", "Dark Bite"],
    Grassol: ["Tackle", "Evade", "Shield", "Vine Whip"],
  };

  const actions = cosmieActions[player] || [];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.background}></div> {/* Background div */}
      <div className={styles.playerInformation}>
        <h1>IT'S MATCH TIME</h1>
        <h1>Battle Room</h1>
        {roomName && <p>Room ID: {roomName}</p>}
        <h3>The user wallet for this is {wallet}</h3>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <p></p>
        <button onClick={sendMessage}>Send Message</button>
        <h2>Life: {lifeAmount}</h2>
        <h2>Enemy Life: {enemyLife}</h2>
      </div>
      <div className={styles.buttonContainer}>
        {actions.map((action, index) => (
          <button
            className={stylesButton.button}
            key={index}
            onClick={() => console.log(`${action} action triggered`)}
          >
            {action}
            <span className={styles.leftArrow}>
              <ArrowRight fill={color ? "green" : "orange"} />
            </span>
          </button>
        ))}
        <button
          className={stylesButton.button}
          onClick={() => console.log("Implement the runaway button")}
        >
          Run Away
        </button>
      </div>
    </div>
  );
};

export default GameRoom;
