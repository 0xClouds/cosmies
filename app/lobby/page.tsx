"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles/RotatingBox.module.scss";
import RotatingBox from "../ui/rotatingBox";

//todo-Move these out?
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();
  const router = useRouter();

  useEffect(() => {
    console.log("im here");

    const handleInserts = async (payload: any) => {
      //Listen to table
      console.log("Change received!", payload);
      const players = await axios.get("/api/lobby", {});
      console.log("the players", players);
      console.log("connected Plyer", wallets[0].address);
      if (players.data.length >= 2) {
        //todo fix the type of a and b
        players.data.sort((a: any, b: any) => a.created_at - b.created_at);
        const oldestPlayerName = players.data[0].public_address;
        const currentPlayer = wallets[0].address;
        if (oldestPlayerName != currentPlayer) {
          const result = await axios.post("/api/battle", {
            player1: oldestPlayerName,
            player2: currentPlayer,
          });
          console.log("the result", result);
          router.push(
            `/gameRoom?name=${encodeURIComponent(result.data.roomName)}`
          );
        }
      }
    };

    const handleBattleInserts = async (payload: any) => {
      console.log("In the battle inserts", payload);
      const battle = payload.new;
      console.log("The opponent is ", battle);
      if (
        battle?.opponent === wallets[0].address ||
        battle?.player === wallets[0].address
      ) {
        console.log("I pushed");
        router.push(`/gameRoom?name=${encodeURIComponent(battle.roomName)}`);
      }
    };

    const lobbySubscription = supabase
      .channel("lobby")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lobby" },
        handleInserts
      )
      .subscribe();
    //handleInserts({});

    const battleSubscription = supabase
      .channel("battles")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "battles" },
        handleBattleInserts
      )
      .subscribe();
    //handleBattleInserts({});

    return () => {
      supabase.removeChannel(lobbySubscription);
      supabase.removeChannel(battleSubscription);
    };

    // Clean up the subscription
  }, [wallets, router]);

  return (
    <RotatingBox
      title="Welcome to the Lobby!"
      footer="Finding an opponent for you . . ."
    ></RotatingBox>
  );
}
