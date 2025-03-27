"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  trustWallet,
  ledgerWallet,
  okxWallet,
  tokenPocketWallet,
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
  gateWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { ToastProvider } from "@/contexts/toast-context";

import { rainbowkitTheme } from "./rainbowkit-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { facetMainnet, facetSepolia } from "@0xfacet/sdk/viem";
import { l1Network, l2Network } from "./network";

const queryClient = new QueryClient();
const projectId = "20caa1a70b33e26ff511865a7993d1d0";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [okxWallet, coinbaseWallet, metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: "Other",
      wallets: [tokenPocketWallet, gateWallet, trustWallet, ledgerWallet],
    },
  ],
  {
    appName: "Facet NFT",
    projectId,
  }
);

export const wagmiConfig = createConfig({
  chains: [l1Network, l2Network],
  connectors,
  transports: {
    [mainnet.id]: http("https://ethereum-rpc.publicnode.com"),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [facetMainnet.id]: http(),
    [facetSepolia.id]: http(),
  },
  ssr: true,
});

export const isSupportedChain = (chainId: number) =>
  l1Network.id === chainId || l2Network.id === chainId;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowkitTheme}>
          <ToastProvider>{children}</ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
