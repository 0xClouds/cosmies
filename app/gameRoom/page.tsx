"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameRoom from "../ui/gameRoom";

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
  const [message, setMessage] = useState("");

  const isSubscribed = useRef(false);

  useEffect(() => {
    if (wallets.length > 0 && wallets[0].address) {
      setWallet(wallets[0].address);
    }
  }, [wallets]);

  const room = supabase.channel(roomName!);

  useEffect(() => {
    if (wallet && !isSubscribed.current) {
      const subscribeToRoom = () => {
        // Subscribe to "got a message" events
        room
          .on("broadcast", { event: "got a message" }, (payload) => {
            if (payload.event === "got a message") {
              const damage = Number(payload.payload.damage);
              setLifeAmount((prevLifeAmount) => prevLifeAmount - damage);
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

  const sendMessage = () => {
    if (message && isSubscribed.current) {
      room
        .send({
          type: "broadcast",
          payload: { damage: message },
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

  useEffect(() => {
    if (lifeAmount <= 0) {
      router.push("/loseRoom");
    }
    sendLifeAmount();
  }, [lifeAmount]);

  useEffect(() => {
    if (enemyLife <= 0) {
      router.push("/winRoom");
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
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
      lifeAmount={lifeAmount}
      enemyLife={enemyLife}
    />
  );
}
