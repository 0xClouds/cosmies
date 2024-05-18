"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles/RotatingBox.module.scss";
import RotatingBox from "../ui/rotatingBox";
import { platform } from "os";

//todo-Move these out?
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();
  // other component code remains the same
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams.get("name");

  const wallet = wallets[0].address;

  const updateDatabase = async () => {
    try {
      const result = await axios.put("/api/battle", {
        player: wallet,
        roomName: roomName,
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
      <h1>The winner is...{wallets[0].address}</h1>
      <RotatingBox
        title="Congrats you won!"
        footer="Keep on going!"
      ></RotatingBox>
      ;
    </div>
  );
}
