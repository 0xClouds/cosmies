import supabase from "../../../data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: Response) {
  try {
    const user = await req.json();

    const { data, error } = await supabase.from("users").insert({
      public_address: user.publicAddress,
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
