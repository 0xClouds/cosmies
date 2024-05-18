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
  const wallet = wallets[0].address;

  const updateDatabase = async () => {
    try {
      const result = await axios.put("/api/battle", {
        player: wallet,
      });
      console.log(result.data); // Handle the result if necessary
    } catch (error) {
      console.error("Error updating database", error);
    }
  };

  useEffect(() => {
    const updateAndRedirect = async () => {
      await updateDatabase();
    };

    updateAndRedirect();
  }, []);

  return (
    <div>
      <h1>The loser is...{wallets[0].address}</h1>
      <RotatingBox
        title="We are sorry, but lost!"
        footer="Your NFT has been burned =("
      ></RotatingBox>
      ;
    </div>
  );
}
