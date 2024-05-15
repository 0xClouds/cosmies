"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

//todo-Move these out
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log("the battle room", name);

  //const [roomChannel, setRoomChannel] = useState(null);
  //const room = supabase.channel(roomId);

  //   useEffect(() => {
  //     if (roomId) {
  //       // Connect to the Supabase real-time channel

  //       room
  //         .on("presence", { event: "sync" }, () => {
  //           const newState = room.presenceState();
  //           console.log("sync", newState);
  //         })
  //         .on("presence", { event: "join" }, ({ key, newPresences }) => {
  //           console.log("join", key, newPresences);
  //         })
  //         .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
  //           console.log("leave", key, leftPresences);
  //         })
  //         .subscribe();

  //       setRoomChannel(room);

  //       return () => {
  //         // Unsubscribe from the channel when the component is unmounted
  //         room.unsubscribe();
  //       };
  //     }
  //   }, [roomId]);

  return (
    <div>
      <h1>Battle Room</h1>
      {name && <p>Room ID: {name}</p>}
      {/* Add communication UI here */}
    </div>
  );
}
