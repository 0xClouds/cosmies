"use client";

import Image from "next/image";
import HomeDesktop from "../ui/homeDesktop";
import LeftSidePage from "../ui/leftSidePage";
import styles from "../../styles/Home.module.scss";
import Head from "next/head";
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { sepolia } from "@alchemy/aa-core";
import { createWalletClient, custom } from "viem";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useSmartAccountClient } from "../contexts/SmartAccountClientContext";
import { useWallets } from "@privy-io/react-auth";

export default function Home() {
  const { ready, authenticated } = usePrivy();

  const { wallets } = useWallets();

  // @ts-ignore
  const { smartAccountClient, setSmartAccountClient } = useSmartAccountClient();

  useEffect(() => {
    async function setupClient() {
      const embeddedWallet = wallets[0];
      if (embeddedWallet) {
        const eip1193provider = await embeddedWallet.getEthereumProvider();
        const privyClient = createWalletClient({
          // @ts-ignore

          account: embeddedWallet.address,
          // @ts-ignore

          chain: "sepolia",
          transport: custom(eip1193provider),
        });

        const privySigner: SmartAccountSigner = new WalletClientSigner(
          // @ts-ignore
          privyClient,
          "json-rpc"
        );

        // Create an Alchemy Light Account Client with the `privySigner`
        const smartAccountClient = await createLightAccountAlchemyClient({
          signer: privySigner,
          chain: sepolia,
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
        });

        setSmartAccountClient(smartAccountClient);
      }
    }

    setupClient();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Cosmies</title>
        <meta name="Cosmies NFT" content="An NFT collection" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      <div className={styles.desktopPage}>
        <HomeDesktop></HomeDesktop>
        <LeftSidePage></LeftSidePage>
      </div>
    </div>
  );
}
