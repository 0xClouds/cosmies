"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameRoom from "../ui/gameRoom";
import { attackOnDefense, attackOnEvade } from "./gameEngine";
import CryptoJS from "crypto-js";

//todo-Move these out
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState(""); // Initialize with empty string or null
  const [lifeAmount, setLifeAmount] = useState(100);
  const [enemyLife, setEnemyLife] = useState(100);

  useEffect(() => {
    // Only update wallet when wallets are available and the first wallet has an address
    if (wallets.length > 0 && wallets[0].address) {
      setWallet(wallets[0].address);
    }
  }, [wallets]); // Depend on wallets to update wallet state

  // other component code remains the same
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams.get("name");
  const startPosition = searchParams.get("data");
  const [attackAmount, setAttackAmount] = useState(0);
  const [attackType, setAttackType] = useState("");
  const [defenseAmount, setDefenseAmount] = useState(0);
  const [evadeAmount, setEvadeAmount] = useState(0);
  const isSubscribed = useRef(false);
  const [currentTurn, setCurrentTurn] = useState(false);

  useEffect(() => {
    if (wallets.length > 0 && wallets[0].address) {
      setWallet(wallets[0].address);

      if (startPosition) {
        try {
          const bytes = CryptoJS.AES.decrypt(startPosition, "secret_key");
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          const { currentPlayer, player1State, player2State } = decryptedData;
          if (wallets[0].address) {
            if (wallets[0].address === currentPlayer) {
              setCurrentTurn(player1State);
            } else {
              setCurrentTurn(player2State);
            }
          }
        } catch (error) {
          console.error("Failed to decrypt data:", error);
        }
      }
    }
  }, [wallets, startPosition]);

  const room = supabase.channel(roomName!);

  useEffect(() => {
    if (wallet && !isSubscribed.current) {
      const subscribeToRoom = () => {
        // Subscribe to "got a message" events
        room
          .on("broadcast", { event: "got a message" }, (payload) => {
            if (defenseAmount != 0) {
              const damage = attackOnDefense(
                defenseAmount,
                payload.payload.damage
              );

              setLifeAmount((prevLifeAmount) => prevLifeAmount - damage);
              setDefenseAmount(0);
              setCurrentTurn(true);
            } else if (evadeAmount != 0) {
              const damage = attackOnEvade(evadeAmount, payload.payload.damage);

              setLifeAmount((prevLifeAmount) => prevLifeAmount - damage);
              setDefenseAmount(0);
              setCurrentTurn(true);
            } else {
              console.log("Got a message");
              const damage = Number(payload.payload.damage);
              setLifeAmount((prevLifeAmount) => prevLifeAmount - damage);
              setCurrentTurn(true);
            }
          })
          .subscribe();

        // Subscribe to "life-update" events
        room.on("broadcast", { event: "life-update" }, (payload) => {
          if (payload.payload.sender !== wallet) {
            setEnemyLife(payload.payload.life);
          }
        });

        isSubscribed.current = true; // Mark as subscribed
      };

      subscribeToRoom();

      // Cleanup function
      return () => {
        if (isSubscribed.current) {
          room.unsubscribe();
          isSubscribed.current = false; // Reset subscription status
        }
      };
    }
  }, [wallet, room]);

  const sendAttackAmount = () => {
    if (attackType && isSubscribed.current) {
      if (attackType === "shield") {
        setDefenseAmount(attackAmount);
        setAttackAmount(0);
      } else if (attackType === "evade") {
        setEvadeAmount(attackAmount);
        setEvadeAmount(0);
      } else {
        room
          .send({
            type: "broadcast",
            payload: { damage: attackAmount, attackType: attackType },
            sender: wallet,
            event: "got a message",
          })
          .then(() => {
            setAttackAmount(0); // Clear the message input after sending
            setCurrentTurn(false);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
      }
    }
  };

  useEffect(() => {
    if (lifeAmount <= 0) {
      router.push(`/loseRoom`);
    }
    sendLifeAmount();
  }, [lifeAmount]);

  useEffect(() => {
    if (enemyLife <= 0) {
      router.push(`/winRoom?name=${encodeURIComponent(roomName!)}`);
    }
  }, [enemyLife]);

  const sendLifeAmount = () => {
    if (isSubscribed.current && wallet) {
      room
        .send({
          type: "broadcast",
          payload: { life: lifeAmount, sender: wallet },
          sender: wallet, //todo for some reason this isn't working with this message, but working with the other one???
          event: "life-update",
        })
        .then(() => {
          console.log("Life amount sent successfully w: ", wallet);
        })
        .catch((error) => {
          console.log("Error sending life amount:", error);
        });
    }
  };

  return (
    <GameRoom
      roomName={roomName}
      wallet={wallet}
      attackAmount={attackAmount}
      setAttackAmount={setAttackAmount}
      sendAttackAmount={sendAttackAmount}
      setAttackType={setAttackType}
      lifeAmount={lifeAmount}
      enemyLife={enemyLife}
      currentTurn={currentTurn}
    />
  );
}
