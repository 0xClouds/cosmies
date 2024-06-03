import { ABI } from "./diceABI";
import { internalWalletClient } from "@/services/WalletClient";
import EventListener from "@/services/eventListener";

async function getDiceRolls() {
  try {
    await internalWalletClient.writeContract({
      address: "0xc975b9ff3178dBCb1918d32eE73E03D4f6aeB92B",
      abi: ABI,
      functionName: "requestRandomWords",
    });
  } catch (e) {
    console.log("internal wallet client failed", e);
  }
}

export async function GET(req: Request, res: Response) {
  try {
    await getDiceRolls();
    return Response.json({ success: 200 });
  } catch (e) {
    Response.json({ error: "Failed to roll dice" });
  }
}
