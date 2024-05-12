import supabase from "../../../data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

enum gameStatus {
  "WAITING" = 0,
  "PLAYING" = 1,
  "DONE" = 2,
}

async function findPlayerId(publicAddress: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("public_address", publicAddress)
    .single(); // Use 'single()' if you expect only one result

  if (error) {
    console.error("Error finding game:", error);
    return null;
  }

  return data.id;
}

export async function POST(req: Request, res: Response) {
  try {
    const user = await req.json();
    const id = await findPlayerId(user.publicAddress);
    const { data, error } = await supabase.from("lobby").insert({
      public_address: user.publicAddress,
      created_at: new Date(),
      status: gameStatus.WAITING,
      id: id,
    });

    //Supabse Error
    if (error) {
      console.error(error);
      return Response.json("Supabase Error");
    }

    return Response.json("Succesfully added user");
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}
