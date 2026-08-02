import SkipLink from "@/components/site/SkipLink";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import BackToTop from "@/components/site/BackToTop";
import CookieConsent from "@/components/site/CookieConsent";
import KeyboardShortcuts from "@/components/site/KeyboardShortcuts";
import SectionDivider from "@/components/site/SectionDivider";
import HeroSection from "@/components/site/HeroSection";
import ProductMetrics from "@/components/site/ProductMetrics";
import OutcomeStrip from "@/components/site/OutcomeStrip";
import ProblemTransformation from "@/components/site/ProblemTransformation";
import ProductProof from "@/components/site/ProductProof";
import AuditIntelligence from "@/components/site/AuditIntelligence";
import ReportExperience from "@/components/site/ReportExperience";
import WhiteLabelSection from "@/components/site/WhiteLabelSection";
import AuditToProposal from "@/components/site/AuditToProposal";
import SalesPipeline from "@/components/site/SalesPipeline";
import CommercialUseCases from "@/components/site/CommercialUseCases";
import OwnershipDeployment from "@/components/site/OwnershipDeployment";
import TechnicalCredibility from "@/components/site/TechnicalCredibility";
import ROICalculator from "@/components/site/ROICalculator";
import PricingSection from "@/components/site/PricingSection";
import LicenceComparison from "@/components/site/LicenceComparison";
import BuyerRiskReduction from "@/components/site/BuyerRiskReduction";
import DueDiligence from "@/components/site/DueDiligence";
import FAQSection from "@/components/site/FAQSection";
import ChangelogSection from "@/components/site/ChangelogSection";
import RoadmapSection from "@/components/site/RoadmapSection";
import SecuritySection from "@/components/site/SecuritySection";
import ContactSection from "@/components/site/ContactSection";
import FinalCTA from "@/components/site/FinalCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F7]">
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductMetrics />
        {/* ProductMetrics (white) -> OutcomeStrip (navy) */}
        <SectionDivider variant="light-to-dark" />
        <OutcomeStrip />
        {/* OutcomeStrip (navy) -> ProblemTransformation (paper) */}
        <SectionDivider variant="dark-to-light" />
        <ProblemTransformation />
        <ProductProof />
        <AuditIntelligence />
        <ReportExperience />
        <WhiteLabelSection />
        <AuditToProposal />
        <SalesPipeline />
        <CommercialUseCases />
        <OwnershipDeployment />
        {/* OwnershipDeployment (paper) -> TechnicalCredibility (navy) */}
        <SectionDivider variant="light-to-dark" />
        <TechnicalCredibility />
        {/* TechnicalCredibility (navy) -> ChangelogSection (paper) */}
        <SectionDivider variant="dark-to-light" />
        <ChangelogSection />
        <RoadmapSection />
        <ROICalculator />
        <PricingSection />
        <LicenceComparison />
        <BuyerRiskReduction />
        {/* BuyerRiskReduction (paper) -> DueDiligence (navy) */}
        <SectionDivider variant="light-to-dark" />
        <DueDiligence />
        {/* DueDiligence (navy) -> FAQSection (paper) */}
        <SectionDivider variant="dark-to-light" />
        <FAQSection />
        {/* FAQSection (paper) -> SecuritySection (navy) */}
        <SectionDivider variant="light-to-dark" />
        <SecuritySection />
        {/* SecuritySection (navy) -> ContactSection (paper) */}
        <SectionDivider variant="dark-to-light" />
        <ContactSection />
        {/* ContactSection (paper) -> FinalCTA (navy) */}
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
