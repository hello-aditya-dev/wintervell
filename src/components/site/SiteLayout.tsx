"use client";

import { useState, useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-50 size-10 rounded-full shadow-md bg-background"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <ArrowUp className="size-4" />
    </Button>
  );
}

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
      <BackToTop />
    </div>
  );
}
