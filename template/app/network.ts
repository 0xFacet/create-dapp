import { facetMainnet, facetSepolia } from "@0xfacet/sdk/viem";
import { mainnet, sepolia } from "viem/chains";

const targetNetworkName =
  (process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "sepolia" | undefined) ??
  "mainnet";

export const l1Network = { mainnet, sepolia }[targetNetworkName];
export const l2Network = { mainnet: facetMainnet, sepolia: facetSepolia }[
  targetNetworkName
];
