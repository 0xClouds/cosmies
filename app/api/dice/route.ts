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
    console.log("clicked");
  } catch (e) {
    console.log("internal wallet client failed", e);
  }
  try {
    console.log("the event is listening");
    const event = new EventListener(
      "0xc975b9ff3178dBCb1918d32eE73E03D4f6aeB92B"
    );
    const data = await event.getEventPromise();
    return data;
  } catch (e) {
    console.log("Event listener failed ", e);
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const data = await getDiceRolls();

    return Response.json(data);
  } catch (e) {
    Response.json({ error: "Failed to roll dice" });
  }
}
