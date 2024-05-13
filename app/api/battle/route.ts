import supabase from "../../../data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

enum gameStatus {
  "LOSER" = 0,
  "WINNER" = 1,
  "PLAYING" = 2,
}

// Helper function to insert into battle table
async function insertBattle(player1: string, player2: string) {
  const { data, error } = await supabase.from("battles").insert([
    {
      player: player1,
      opponent: player2,
      determination: gameStatus.PLAYING,
      winner: null,
    },
  ]);
  return { data, error };
}

// Helper function to update lobby status
async function updateLobbyStatus(player1: string, player2: string) {
  const { data, error } = await supabase
    .from("lobby")
    .update({ status: 1 })
    .or(`public_address.eq.${player1},public_address.eq.${player2}`);
  return { data, error };
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { player1, player2 } = await req.json();

    console.log("p1", player1);
    console.log("p2", player2);

    // Insert into battle table
    const { error: insertError } = await insertBattle(player1, player2);
    if (insertError) {
      console.error(insertError);
      return res
        .status(500)
        .json({ error: "Supabase Error adding to battle table" });
    }

    // Update lobby status
    const { error: updateError } = await updateLobbyStatus(player1, player2);
    if (updateError) {
      console.error(updateError);
      return res
        .status(500)
        .json({ error: "Supabase Error updating player status" });
    }

    return res.status(200).json({
      message: "Successfully updated player status and moved to battle",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
