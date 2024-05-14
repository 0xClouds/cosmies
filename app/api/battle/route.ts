import supabase from "../../../data/supabase";
import { NextApiRequestuest, NextApiResponseponse } from "next";

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

// Helper function to create or assign room/channel
async function createOrAssignRoom(player1: string, player2: string) {
  const roomName = `room_${player1.slice(5)}_${player2.slice(5)}`;

  // const { data: roomData, error: roomError } = await supabase
  //   .from("rooms")
  //   .insert([
  //     {
  //       name: roomName,
  //       player1,
  //       player2,
  //       status: "active",
  //     },
  //   ]);

  // if (roomError) {
  //   return { data: null, error: roomError };
  // }

  return roomName;
}

export async function POST(req: Request, res: Response) {
  try {
    const { player1, player2 } = await req.json();

    console.log("p1", player1);
    console.log("p2", player2);

    // Insert into battle table
    const { error: insertError } = await insertBattle(player1, player2);
    if (insertError) {
      console.error("insert to battle", insertError);
      return Response.json({ error: "Supabase Error adding to battle table" });
    }

    // Update lobby status
    const { error: updateError } = await updateLobbyStatus(player1, player2);
    if (updateError) {
      console.error("update error", updateError);
      return Response.json({ error: "Supabase Error updating player status" });
    }

    const room = await createOrAssignRoom(player1, player2);
    if (!room) {
      console.error("create room error");
      return Response.json({
        error: "Supabase Error creating or assigning room",
      });
    }

    // Return room information
    return Response.json({
      message: "Successfully updated player status and moved to battle room",
      room: room ? room : "",
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" });
  }
}
