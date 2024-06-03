import styles from "../../styles/GameRoom.module.scss";
import stylesButton from "../../styles/Button.module.scss";

import { Suspense, useEffect, useState } from "react";
import ArrowRight from "@/public/images/icons/arrow-right";

import { getDiceRoll, Cosmie, Stat } from "../gameRoom/gameEngine";
import axios from "axios";

interface GameRoomProps {
  roomName: string | null;
  wallet: string;
  attackAmount: number;
  setAttackAmount: (attackAmount: number) => void;
  sendAttackAmount: () => void;
  setAttackType: (attackType: string) => void;
  lifeAmount: number;
  enemyLife: number;
  currentTurn: boolean;
  defense: number;
}

const GameRoom: React.FC<GameRoomProps> = ({
  roomName,
  wallet,
  attackAmount,
  setAttackAmount,
  sendAttackAmount,
  setAttackType,
  lifeAmount,
  enemyLife,
  currentTurn,
  defense,
}) => {
  const [color, setColor] = useState(false);
  const [randomNumbers, setRandomNumber] = useState([]);
  const player = "jambi" as Cosmie;
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const cosmieActions: Record<Cosmie, Array<String>> = {
    jambi: ["Tackle", "Evade", "Shield", "Ice Punch"],
    glacepom: ["Tackle", "Evade", "Shield", "Fire Kick"],
    suburaku: ["Tackle", "Evade", "Shield", "Dark Bite"],
    grassol: ["Tackle", "Evade", "Shield", "Vine Whip"],
  };

  useEffect(() => {
    const getRandomNumbers = async () => {
      try {
        const response = await axios.get("/api/dice");
        setRandomNumber(response.data); // Assuming response.data contains the numbers you need
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (e) {
        console.log("Dice Roll Failed", e);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      }
    };
    getRandomNumbers();
  }, []);

  // Map the actions to valid Stat values
  //typescript bullshit
  const actionMap: Record<string, Stat> = {
    Tackle: "tackle",
    Evade: "evade",
    Shield: "shield",
    "Ice Punch": "specialMove",
    "Fire Kick": "specialMove",
    "Dark Bite": "specialMove",
    "Vine Whip": "specialMove",
  };

  const actions: Array<Stat> = cosmieActions[player].map(
    (action) => (actionMap[action as string] as Stat) || "specialMove"
  );

  function actionClick(player: Cosmie, action: Stat) {
    const attackAmount = getDiceRoll(player, action, randomNumbers);
    setAttackType(action);
    setAttackAmount(attackAmount);
  }

  if (isLoading) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.background}></div>
        <div className={styles.playerInformation}>
          <h1>IT IS MATCH TIME</h1>
          <h1>Battle Room</h1>
          {roomName && <p>Room ID: {roomName}</p>}
          <h3>Please wait while we use chainlink VFR...</h3>;
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <div className={styles.mainContainer}>
        <div className={styles.background}></div>
        <div className={styles.playerInformation}>
          <h1>IT IS MATCH TIME</h1>
          <h1>Battle Room</h1>
          {roomName && <p>Room ID: {roomName}</p>}
          <h3>The user wallet for this is {wallet}</h3>
          <h2>{attackAmount}</h2>
          <p></p>
          <h2>Defense: {defense}</h2>
          <p></p>
          <button onClick={sendAttackAmount}>Send Message</button>
          <h2>Life: {lifeAmount}</h2>
          <h2>Enemy Life: {enemyLife}</h2>
        </div>
        <div className={styles.buttonContainer}>
          {actions.map((action, index) => (
            <button
              className={stylesButton.button}
              key={index}
              onClick={() => actionClick(player, action)}
              disabled={!currentTurn}
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
            disabled={!currentTurn}
          >
            Run Away
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default GameRoom;
