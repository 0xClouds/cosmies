import { ABI } from "./diceABI";
import { internalWalletClient } from "@/services/WalletClient";

type EthereumAddress = `0x${string}`;

async function getDiceRolls() {
  try {
    await internalWalletClient.writeContract({
      //@ts-ignore
      address: "0xc975b9ff3178dBCb1918d32eE73E03D4f6aeB92B" as EthereumAddress,
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
