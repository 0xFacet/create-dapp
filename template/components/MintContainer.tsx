"use client";

import { useAccount } from "wagmi";
import { Button, Section, Heading } from "@0xfacet/component-library";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { nftCollectionAbi } from "@/constants/abi";
import { useWriteFacetContract } from "@0xfacet/sdk";

export function MintContainer() {
  const { writeFacetContractAsync } = useWriteFacetContract();
  const { isConnected, address } = useAccount();

  const handleMint = async () => {
    if (address) {
      const hash = await writeFacetContractAsync({
        address: "0x4ee6e331c20baec0b4170f2caf10b2d527e599bb",
        functionName: "mint",
        abi: nftCollectionAbi,
      });
      console.log(hash);
    }
  };

  return (
    <Section>
      <div className="max-w-md mx-auto">
        <Heading className="text-center mb-6">Facet Demo NFT</Heading>

        <div className="space-y-6">
          <div className="text-center">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAMBJREFUSInllbsNhTAMRS8WAzDAW4aGpShRlkqT0R5VELnYIRIWBXED2MYf+cgepu33x0sibyUCgDG/zOtyKFOIYH3WaX7zuiCFeDwtv0tnnCiFWOj4WyuW42SRmkOulgOdO7AK4H8AYOgDkJYhPwGp6KxlyFaiFpCkZtSGrBXRClIHgAC+26IKiPe20GwFIJ7bQiuiA0C8t4UGkmjBWLzOjlgGq4gnIHUMiOfZqW59DsTBWO5Autwzr22hgfRdQHalI/AdA3yaxwAAAABJRU5ErkJggg=="
              alt="Facet Demo NFT"
              width={300}
              height={300}
              className="rounded-lg mx-auto"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="text-center space-y-4">
            {isConnected && (
              <Button className="w-full" onClick={handleMint}>
                Mint NFT
              </Button>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </Section>
  );
}
