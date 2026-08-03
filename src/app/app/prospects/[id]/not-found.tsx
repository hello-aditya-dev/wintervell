import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProspectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="size-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-1">Prospect not found</h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        The prospect you&apos;re looking for doesn&apos;t exist or has been removed from the demonstration workspace.
      </p>
      <Button asChild variant="outline" size="sm">
        <Link href="/app/prospects">
          <ArrowLeft className="size-3.5 mr-1.5" />
          Back to Prospects
        </Link>
      </Button>
    </div>
  );
}
