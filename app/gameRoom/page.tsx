"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

//todo-Move these out
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState(""); // Initialize with empty string or null

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
  const [message, setMessage] = useState("");

  const isSubscribed = useRef(false);

  useEffect(() => {
    if (wallets.length > 0 && wallets[0].address) {
      setWallet(wallets[0].address);
    }
  }, [wallets]);

  const room = supabase.channel(roomName!, {
    config: {
      broadcast: { self: true },
    },
  });

  useEffect(() => {
    if (wallet && !isSubscribed.current) {
      const subscribeToRoom = () => {
        room
          .on("broadcast", { event: "got a message" }, (payload) => {
            console.log("Received message:", payload);
          })
          .subscribe();
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

  const sendMessage = () => {
    if (message && isSubscribed.current) {
      room
        .send({
          type: "broadcast",
          payload: { message },
          sender: wallet,
          event: "got a message",
        })
        .then(() => {
          console.log("THE MESSAGE WAS SENT");
          setMessage(""); // Clear the message input after sending
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    }
  };

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
