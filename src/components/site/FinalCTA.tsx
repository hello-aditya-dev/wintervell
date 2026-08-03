import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageSquare, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary-hover)] to-[#0F1923]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-white">
            Review the product before the commercial release.
          </h2>
          <p className="mt-3 text-body text-white/70">
            Explore the interactive demo, view a sample report, or ask a
            product question.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90" asChild>
            <Link href="/app">
              Explore demo
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
            <Link href="/sample-report">
              <FileText className="mr-1 size-4" />
              View sample report
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
            <Link href="/contact">
              <MessageSquare className="mr-1 size-4" />
              Ask a product question
            </Link>
          </Button>
        </div>

        {/* Trust line */}
        <div className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <ShieldCheck className="size-3.5" />
            <span>Self-hosted on your infrastructure</span>
          </div>
          <span className="hidden sm:inline text-white/20">·</span>
          <div className="text-xs text-white/50">
            Source code included with every licence
          </div>
          <span className="hidden sm:inline text-white/20">·</span>
          <div className="text-xs text-white/50">
            No website is crawled, no email is sent and no payment is processed.
          </div>
        </div>
      </div>
    </section>
  );
}
