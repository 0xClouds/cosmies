"use client";
import { useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import RotatingBox from "../ui/rotatingBox";

// todo-Move these out?
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState("YOU");

  const updateDatabase = async (walletAddress: string) => {
    try {
      const result = await axios.put("/api/battle", {
        player: walletAddress,
      });
      console.log(result.data); // Handle the result if necessary
    } catch (error) {
      console.error("Error updating database", error);
    }
  };

  useEffect(() => {
    if (wallets.length > 0) {
      const walletAddress = wallets[0].address || "YOU";
      setWallet(walletAddress);
      updateDatabase(walletAddress);
    }
  }, [wallets]);

  return (
    <div>
      <RotatingBox
        title={"We are sorry, " + wallet + " but you lost!"}
        footer="Your NFT has been burned =( "
      ></RotatingBox>
    </div>
  );
}
