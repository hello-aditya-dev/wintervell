import SiteLayout from "@/components/site/SiteLayout";
import HeroSection from "@/components/site/HeroSection";
import CoreWorkflow from "@/components/site/CoreWorkflow";
import ProductPreview from "@/components/site/ProductPreview";
import Differentiators from "@/components/site/Differentiators";
import WhiteLabelPreview from "@/components/site/WhiteLabelPreview";
import OwnershipDeployment from "@/components/site/OwnershipDeployment";
import PricingPreview from "@/components/site/PricingPreview";
import DueDiligencePreview from "@/components/site/DueDiligencePreview";
import FinalCTA from "@/components/site/FinalCTA";

export default function Home() {
  return (
    <SiteLayout>
      <HeroSection />
      <CoreWorkflow />
      <ProductPreview />
      <Differentiators />
      <WhiteLabelPreview />
      <OwnershipDeployment />
      <PricingPreview />
      <DueDiligencePreview />
      <FinalCTA />
    </SiteLayout>
  );
}
