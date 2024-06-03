import { internalWalletClient } from "@/services/WalletClient";
import { parseEther } from "viem";
import CosmieERC721 from "@/data/abis/CosmieERC721.json";

export async function POST(req: Request) {
  const { ipfsHash } = await req.json();
  console.log("im the ipfsHASHSH", ipfsHash);
  try {
    await internalWalletClient.writeContract({
      address: "0xd127262169333a1Bc3Ff01755CbbE22d06F293de",
      abi: CosmieERC721,
      functionName: "safeMint",
      args: [ipfsHash],
      value: parseEther(".05"),
    });

    return new Response("Cosmie Minted", { status: 200 });
  } catch (e) {
    throw e;
  }
}
