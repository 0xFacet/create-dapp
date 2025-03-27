import { MintContainer } from "@/components/MintContainer";
import { SectionContainer, Section } from "@0xfacet/component-library";

export default function Home() {
  return (
    <SectionContainer>
      <Section className="flex flex-col items-center justify-center min-h-[80vh]">
        <MintContainer />
      </Section>
    </SectionContainer>
  );
}
