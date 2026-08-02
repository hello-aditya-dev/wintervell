import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import BackToTop from "@/components/site/BackToTop";
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
import SecuritySection from "@/components/site/SecuritySection";
import ContactSection from "@/components/site/ContactSection";
import FinalCTA from "@/components/site/FinalCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F7]">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductMetrics />
        <OutcomeStrip />
        <ProblemTransformation />
        <ProductProof />
        <AuditIntelligence />
        <ReportExperience />
        <WhiteLabelSection />
        <AuditToProposal />
        <SalesPipeline />
        <CommercialUseCases />
        <OwnershipDeployment />
        <TechnicalCredibility />
        <ROICalculator />
        <PricingSection />
        <LicenceComparison />
        <BuyerRiskReduction />
        <DueDiligence />
        <FAQSection />
        <SecuritySection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
