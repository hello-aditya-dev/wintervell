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
      {/* 1. Header — rendered by SiteLayout */}
      {/* 2. Hero */}
      <HeroSection />
      {/* 3. Core workflow */}
      <CoreWorkflow />
      {/* 4. Product preview */}
      <ProductPreview />
      {/* 5. Three differentiators */}
      <Differentiators />
      {/* 6. White-label preview */}
      <WhiteLabelPreview />
      {/* 7. Ownership and current release state */}
      <OwnershipDeployment />
      {/* 8. Planned pricing */}
      <PricingPreview />
      {/* 9. Due-diligence preview */}
      <DueDiligencePreview />
      {/* 10. Final CTA — footer rendered by SiteLayout */}
      <FinalCTA />
    </SiteLayout>
  );
}
