import { internalWalletClient } from "@/services/WalletClient";
import StatGeneratorAbi from "@/data/abis/StatGeneratorAbi.json";
type EthereumAddress = `0x${string}`;

export async function POST(req: Request) {
  console.log("You called me!!");
  try {
    await internalWalletClient.writeContract({
      address: "0x32abb4d02235f6ff026f6b2a0849d56f6fdba028" as EthereumAddress,
      abi: StatGeneratorAbi,
      functionName: "requestRandomWords",
    });
    return new Response("Succesful!", { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
