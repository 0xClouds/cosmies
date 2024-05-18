import supabase from "../../../data/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { gameStatus, lobbyStatus } from "../enums/enums";

// Helper function to insert into battle table
async function insertBattle(
  player1: string,
  player2: string,
  roomName: string
) {
  const { data, error } = await supabase.from("battles").insert([
    {
      player: player1,
      opponent: player2,
      determination: gameStatus.INCOMPLETE,
      winner: null,
      roomName: roomName,
    },
  ]);
  return { data, error };
}

// Helper function to update lobby status
async function updateLobbyStatus(player: string, status: lobbyStatus) {
  const { data, error } = await supabase
    .from("lobby")
    .update({ status: status })
    .eq("public_address", player);
  return { data, error };
}

async function updateBattleStatus(winner: string, roomName: string) {
  const { data, error } = await supabase
    .from("battles")
    .update({ determination: gameStatus.COMPLETE, winner: winner })
    .eq("roomName", roomName)
    .eq("determination", gameStatus.INCOMPLETE);
  return { data, error };
}

export async function POST(req: Request, res: Response) {
  try {
    const { player1, player2 } = await req.json();
    const roomName = `room_${player1.slice(5)}_${player2.slice(5)}`;

    console.log("p1", player1);
    console.log("p2", player2);

    // Insert into battle table
    const { data: battleData, error: insertError } = await insertBattle(
      player1,
      player2,
      roomName
    );
    if (insertError) {
      console.error("insert to battle", insertError);
      return Response.json({ error: "Supabase Error adding to battle table" });
    }

    // Update lobby status
    const { error: updateErrorPlayer1 } = await updateLobbyStatus(
      player1,
      lobbyStatus.PLAYING
    );
    if (updateErrorPlayer1) {
      console.error("update error", updateErrorPlayer1);
      return Response.json({ error: "Supabase Error updating player status" });
    }

    // Update lobby status
    const { error: updateErrorPlayer2 } = await updateLobbyStatus(
      player2,
      lobbyStatus.PLAYING
    );
    if (updateErrorPlayer2) {
      console.error("update error", updateErrorPlayer2);
      return Response.json({ error: "Supabase Error updating player status" });
    }

    // Return room information
    return Response.json({
      message: "Successfully updated player status and moved to battle room",
      roomName: roomName,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { player, roomName } = await req.json();

    if (roomName) {
      //update battle table with winner
      const { error } = await updateBattleStatus(player, roomName);
      if (error) {
        console.error("Update Battle Table DB ERROR", error);
        return Response.json({ error: "Supabase Error updating battle table" });
      }

      // Update lobby status
      const { error: updateError } = await updateLobbyStatus(
        player,
        lobbyStatus.DONE
      );
      if (updateError) {
        console.error("update lobby status error", updateError);
        return Response.json({ error: "Supabase Error updating lobby status" });
      }

      // Return room information
      return Response.json({
        message: "Successfully choose winner and updated battle table",
        roomName: roomName,
      });
    } else {
      const { error: updateError } = await updateLobbyStatus(
        player,
        lobbyStatus.DONE
      );
      if (updateError) {
        console.error("update lobby status error", updateError);
        return Response.json({
          error: "Supabase Error updating lobby status",
        });
      }

      // Return room information
      return Response.json({
        message: "Successfully choose looser  and updated battle table",
        roomName: roomName,
      });
    }
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" });
  }
}
