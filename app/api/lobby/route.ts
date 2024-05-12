import supabase from "../../../data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

enum gameStatus {
  "WAITING" = 0,
  "PLAYING" = 1,
  "DONE" = 2,
}

export async function POST(req: Request, res: Response) {
  try {
    const user = await req.json();
    const { data, error } = await supabase.from("lobby").insert({
      public_address: user.publicAddress,
      status: gameStatus.WAITING,
      created_at: new Date(),
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
