"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";

const SUPABASE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function Page() {
  useEffect(() => {
    console.log("im here");

    const handleInserts = (payload: any) => {
      console.log("Change received!", payload);
    };

    supabase
      .channel("lobby")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lobby" },
        handleInserts
      )
      .subscribe();

    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [supabase]);

  return <div> Hello World</div>;
}
