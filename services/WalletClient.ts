import { createWalletClient, custom, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

type EthereumAddress = `0x${string}`;

const account = privateKeyToAccount(process.env.PRIVATE_KEY as EthereumAddress);

const internalWalletClient = createWalletClient({
  //@ts-ignore
  account,
  chain: sepolia,
  transport: http(),
});

const PublicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export { internalWalletClient, PublicClient };
