import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Product Preview Banner — honest status indicator */}
      <div className="bg-[#142634] text-center py-1.5 px-4" role="status">
        <p className="text-xs text-[#B7DDEC]">
          <strong className="font-medium">Product preview.</strong>{" "}
          WinterVell is in development. The interactive demo shows the planned
          interface using fictional data. Purchasing is not yet open.
        </p>
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
