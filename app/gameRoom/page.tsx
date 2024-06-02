// @ts-nocheck
"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameRoom from "../ui/gameRoom";
import { attackOnDefense, attackOnEvade } from "./gameEngine";
import CryptoJS from "crypto-js";
import { start } from "repl";

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";
const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams.get("name");
  const playerPassedIn = searchParams.get("currentPlayer");
  const startPosition = searchParams.get("start") === "true";

  const [wallet, setWallet] = useState<string>("");
  const [lifeAmount, setLifeAmount] = useState(100);
  const [enemyLife, setEnemyLife] = useState(100);
  const [attackAmount, setAttackAmount] = useState(0);
  const [attackType, setAttackType] = useState<string>("");
  const [defenseAmount, setDefenseAmount] = useState(0);
  const [evadeAmount, setEvadeAmount] = useState(0);
  const defenseAmountRef = useRef(defenseAmount);
  const evadeAmountRef = useRef(evadeAmount);
  const [currentTurn, setCurrentTurn] = useState(false);
  const isSubscribed = useRef(false);
  const room = useRef(supabase.channel(roomName!)).current;

  const initializeWallet = useCallback(() => {
    if (wallets.length > 0 && wallets[0].address) {
      setWallet(wallets[0].address);
    }
  }, [wallets]);

  useEffect(() => {
    defenseAmountRef.current = defenseAmount;
    evadeAmountRef.current = evadeAmount;
  }, [defenseAmount, evadeAmount]);

  useEffect(() => {
    initializeWallet();
  }, [initializeWallet]);

  useEffect(() => {
    if (playerPassedIn) {
      try {
        const isCurrentTurn =
          wallet === playerPassedIn ? startPosition : !startPosition;
        setCurrentTurn(isCurrentTurn);
      } catch (error) {
        console.error("Failed to decrypt data:", error);
      }
    }
  }, [playerPassedIn]);

  const subscribeToRoom = useCallback(() => {
    if (wallet && !isSubscribed.current) {
      room
        .on("broadcast", { event: "got a message" }, (payload) => {
          let damage = Number(payload.payload.damage);
          if (defenseAmountRef.current !== 0) {
            damage = attackOnDefense(defenseAmountRef.current, damage);
            setDefenseAmount(0);
          } else if (evadeAmountRef.current !== 0) {
            damage = attackOnEvade(evadeAmountRef.current, damage);
            setEvadeAmount(0);
          }
          setLifeAmount((prev) => prev - damage);
          setCurrentTurn(true);
        })
        .on("broadcast", { event: "life-update" }, (payload) => {
          if (payload.payload.sender !== wallet) {
            setEnemyLife(payload.payload.life);
          }
        })
        .subscribe();

      isSubscribed.current = true;

      return () => {
        if (isSubscribed.current) {
          room.unsubscribe();
          isSubscribed.current = false;
        }
      };
    }
  }, [wallet, room, defenseAmount, evadeAmount]);

  useEffect(() => {
    subscribeToRoom();
  }, [subscribeToRoom]);

  const sendAttack = useCallback(() => {
    if (attackType && isSubscribed.current) {
      const payload = {
        type: "broadcast",
        payload: { damage: attackAmount, attackType },
        sender: wallet,
        event: "got a message",
      };

      if (attackType === "shield") {
        setDefenseAmount(attackAmount);
        payload.payload.damage = 0;
      } else if (attackType === "evade") {
        setEvadeAmount(attackAmount);
        payload.payload.damage = 0;
      }

      room
        .send(payload)
        .then(() => {
          setAttackAmount(0);
          setCurrentTurn(false);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  }, [attackAmount, attackType, wallet, room]);

  useEffect(() => {
    if (lifeAmount <= 0) {
      sendLifeAmount();
      router.push(`/loseRoom`);
    } else {
      sendLifeAmount();
    }
  }, [lifeAmount]);

  useEffect(() => {
    if (enemyLife <= 0) {
      router.push(`/winRoom?name=${encodeURIComponent(roomName!)}`);
    }
  }, [enemyLife]);

  const sendLifeAmount = useCallback(() => {
    if (isSubscribed.current && wallet) {
      room
        .send({
          type: "broadcast",
          payload: { life: lifeAmount, sender: wallet },
          sender: wallet,
          event: "life-update",
        })
        .then(() => console.log("Life amount sent successfully:", wallet))
        .catch((error) => console.error("Error sending life amount:", error));
    }
  }, [lifeAmount, wallet, room]);

  return (
    <GameRoom
      roomName={roomName}
      wallet={wallet}
      attackAmount={attackAmount}
      setAttackAmount={setAttackAmount}
      sendAttackAmount={sendAttack}
      setAttackType={setAttackType}
      lifeAmount={lifeAmount}
      enemyLife={enemyLife}
      currentTurn={currentTurn}
      defense={defenseAmount}
    />
  );
}
