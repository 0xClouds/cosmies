"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

//todo-Move these out
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams.get("name");
  const { wallets } = useWallets();
  const wallet = wallets[0].address;
  const [message, setMessage] = useState("");

  const room = supabase.channel(roomName!, {
    config: {
      broadcast: { self: true },
    },
  });
  // useEffect(() => {
  //   if (room) {
  //     // Connect to the Supabase real-time channel
  //     room
  //       .on("presence", { event: "sync" }, () => {
  //         const newState = room.presenceState();
  //         console.log("sync", newState);
  //       })
  //       .on("presence", { event: "join" }, ({ key, newPresences }) => {
  //         console.log("join", key, newPresences);
  //       })
  //       .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
  //         console.log("leave", key, leftPresences);
  //       })
  //       .subscribe();

  //     // return () => {
  //     //   // Unsubscribe from the channel when the component is unmounted
  //     //   room.unsubscribe();
  //     // };
  //   }
  // }, [roomName]);

  const sendMessage = async () => {
    if (message) {
      await room.send({
        type: "broadcast",
        payload: { message: message },
        sender: wallet,
        event: "send a message",
      });
      setMessage(""); // Clear the message input after sending
    }
  };

  room
    .on("broadcast", { event: "got a message" }, (payload) => {
      console.log("Received message:", payload);
    })
    .subscribe();

  return (
    <div>
      <h1>Battle Room</h1>
      {roomName && <p>Room ID: {roomName}</p>}
      <h3>The user wallet for this is {wallet}</h3>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendMessage}>Send Message</button>
      {/* Display messages here */}
    </div>
  );
}
