import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet } from "viem/chains";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
