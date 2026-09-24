import Hero from "@/components/sections/Hero";
import CapabilityStrip from "@/components/sections/CapabilityStrip";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import MachineStory from "@/components/sections/MachineStory";
import Applications from "@/components/sections/Applications";
import EnquiryCTA from "@/components/sections/EnquiryCTA";
import ContactPreview from "@/components/sections/ContactPreview";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <Services />
      <MachineStory />
      <Applications />
      <EnquiryCTA />
      <ContactPreview />
    </>
  );
}
