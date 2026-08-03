import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageSquare } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">
            Review the product before the commercial release.
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Explore the interactive demo, view a sample report, or ask a
            product question.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/app">
              Explore demo
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/sample-report">
              <FileText className="mr-1 size-4" />
              View sample report
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <MessageSquare className="mr-1 size-4" />
              Ask a product question
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
