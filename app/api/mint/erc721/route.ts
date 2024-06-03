import { internalWalletClient } from "@/services/WalletClient";
import { parseEther } from "viem";
import CosmieERC721 from "@/data/abis/CosmieERC721.json";

type EthereumAddress = `0x${string}`;

export async function POST(req: Request) {
  const { ipfsHash } = await req.json();
  try {
    await internalWalletClient.writeContract({
      address: "0xd127262169333a1Bc3Ff01755CbbE22d06F293de" as EthereumAddress,
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
