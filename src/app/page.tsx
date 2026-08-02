import dynamic from "next/dynamic";
import SkipLink from "@/components/site/SkipLink";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import BackToTop from "@/components/site/BackToTop";
import CookieConsent from "@/components/site/CookieConsent";
import KeyboardShortcuts from "@/components/site/KeyboardShortcuts";
import SectionDivider from "@/components/site/SectionDivider";

/* ─── Dynamic imports to reduce initial compilation memory ─── */
const HeroSection = dynamic(() => import("@/components/site/HeroSection"));
const ProductMetrics = dynamic(() => import("@/components/site/ProductMetrics"));
const OutcomeStrip = dynamic(() => import("@/components/site/OutcomeStrip"));
const ProblemTransformation = dynamic(() => import("@/components/site/ProblemTransformation"));
const ProductProof = dynamic(() => import("@/components/site/ProductProof"));
const InteractiveAuditDemo = dynamic(() => import("@/components/site/InteractiveAuditDemo"));
const AuditIntelligence = dynamic(() => import("@/components/site/AuditIntelligence"));
const ReportExperience = dynamic(() => import("@/components/site/ReportExperience"));
const WhiteLabelSection = dynamic(() => import("@/components/site/WhiteLabelSection"));
const AuditToProposal = dynamic(() => import("@/components/site/AuditToProposal"));
const SalesPipeline = dynamic(() => import("@/components/site/SalesPipeline"));
const CommercialUseCases = dynamic(() => import("@/components/site/CommercialUseCases"));
const TestimonialsSection = dynamic(() => import("@/components/site/TestimonialsSection"));
const OwnershipDeployment = dynamic(() => import("@/components/site/OwnershipDeployment"));
const TechnicalCredibility = dynamic(() => import("@/components/site/TechnicalCredibility"));
const ChangelogSection = dynamic(() => import("@/components/site/ChangelogSection"));
const RoadmapSection = dynamic(() => import("@/components/site/RoadmapSection"));
const ROICalculator = dynamic(() => import("@/components/site/ROICalculator"));
const PricingSection = dynamic(() => import("@/components/site/PricingSection"));
const LicenceComparison = dynamic(() => import("@/components/site/LicenceComparison"));
const BuyerRiskReduction = dynamic(() => import("@/components/site/BuyerRiskReduction"));
const DueDiligence = dynamic(() => import("@/components/site/DueDiligence"));
const FAQSection = dynamic(() => import("@/components/site/FAQSection"));
const SecuritySection = dynamic(() => import("@/components/site/SecuritySection"));
const ContactSection = dynamic(() => import("@/components/site/ContactSection"));
const FinalCTA = dynamic(() => import("@/components/site/FinalCTA"));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F7]">
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductMetrics />
        <SectionDivider variant="light-to-dark" />
        <OutcomeStrip />
        <SectionDivider variant="dark-to-light" />
        <ProblemTransformation />
        <ProductProof />
        <InteractiveAuditDemo />
        <AuditIntelligence />
        <ReportExperience />
        <WhiteLabelSection />
        <AuditToProposal />
        <SalesPipeline />
        <CommercialUseCases />
        <SectionDivider variant="light-to-dark" />
        <TestimonialsSection />
        <SectionDivider variant="dark-to-light" />
        <OwnershipDeployment />
        <SectionDivider variant="light-to-dark" />
        <TechnicalCredibility />
        <SectionDivider variant="dark-to-light" />
        <ChangelogSection />
        <RoadmapSection />
        <ROICalculator />
        <PricingSection />
        <LicenceComparison />
        <BuyerRiskReduction />
        <SectionDivider variant="light-to-dark" />
        <DueDiligence />
        <SectionDivider variant="dark-to-light" />
        <FAQSection />
        <SectionDivider variant="light-to-dark" />
        <SecuritySection />
        <SectionDivider variant="dark-to-light" />
        <ContactSection />
        <SectionDivider variant="light-to-dark" />
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
      <KeyboardShortcuts />
      <CookieConsent />
    </div>
  );
}
