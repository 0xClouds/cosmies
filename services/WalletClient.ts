import { createWalletClient, custom } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

type EthereumAddress = `0x${string}`;

const account = privateKeyToAccount(process.env.PRIVATE_KEY as EthereumAddress);

const internalWalletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: custom(window.ethereum),
});

export default internalWalletClient;
