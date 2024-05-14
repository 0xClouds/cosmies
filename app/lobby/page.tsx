"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import router from "next/navigation";
import { useEffect } from "react";

//todo-Move these out?
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();

  useEffect(() => {
    console.log("im here");

    const handleInserts = async (payload: any) => {
      //Listen to table
      console.log("Change received!", payload);
      const players = await axios.get("http://localhost:3000/api/lobby", {});
      console.log("the players", players);
      console.log("connected Plyer", wallets[0].address);
      if (players.data.length >= 2) {
        players.data.sort((a, b) => a.created_at - b.created_at);
        const oldestPlayerName = players.data[0].public_address;
        const currentPlayer = wallets[0].address;
        if (oldestPlayerName != currentPlayer) {
          const result = await axios.post("http://localhost:3000/api/battle", {
            player1: oldestPlayerName,
            player2: currentPlayer,
          });
          console.log("the result", result);
          // router.push("/gameRoom");
        }
      }
    };

    supabase
      .channel("lobby")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lobby" },
        handleInserts
      )
      .subscribe();
    handleInserts({});
    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [supabase]);

  return <div> Hello Welcome to the lobby</div>;
}
