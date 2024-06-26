"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "../config";
import { WagmiProvider } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SmartAccountClientProvider } from "./contexts/SmartAccountClientContext";
import Navbar from "./ui/navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

//removed an export here
// const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showNavbar = pathname === "/home" || pathname === "/mint";
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <PrivyProvider
            appId="clvwzg6ap044r11cf6kdlpilh"
            config={{
              //move this to a config file
              appearance: {
                theme: "light",
                accentColor: "#38B3E3",
                logo: "../public/images/logo.png",
              },
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
                noPromptOnSignature: true,
              },
            }}
          >
            <QueryClientProvider client={queryClient}>
              <SmartAccountClientProvider>
                {showNavbar && <Navbar currentPage="home" />}
                {children}
              </SmartAccountClientProvider>
            </QueryClientProvider>
          </PrivyProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
