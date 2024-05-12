"use client";

import Image from "next/image";
import HomeDesktop from "./ui/homeDesktop";
import LeftSidePage from "./ui/leftSidePage";
import SignIn from "./ui/signIn";
import styles from "../styles/Home.module.scss";
import Head from "next/head";
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { sepolia } from "@alchemy/aa-core";
import { createWalletClient, custom } from "viem";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

import { useConnectWallet, useWallets } from "@privy-io/react-auth";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Cosmies</title>
        <meta name="Cosmies NFT" content="An NFT collection" />
      </Head>
      <div className={styles.desktopPage}>
        <SignIn></SignIn>
      </div>
    </div>
  );
}
