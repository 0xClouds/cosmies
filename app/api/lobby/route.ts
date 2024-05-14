import supabase from "../../../data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

enum lobbyStatus {
  "WAITING" = 0,
  "PLAYING" = 1,
  "DONE" = 2,
}

export async function POST(req: Request, res: Response) {
  try {
    const user = await req.json();
    const { data, error } = await supabase.from("lobby").insert({
      public_address: user.publicAddress,
      status: lobbyStatus.WAITING,
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

//how can we add more Get functions in this page
export async function GET(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("lobby")
      .select("public_address,created_at")
      .eq("status", lobbyStatus.WAITING);

    if (error) {
      console.log(error);
      return Response.json("Supabase Error Get in lobby");
    }
    return Response.json(data);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}
