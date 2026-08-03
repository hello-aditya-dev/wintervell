import Link from 'next/link';
import { FileQuestion, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="size-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-1">Page not found</h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try navigating from the dashboard.
      </p>
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/app">
            <LayoutDashboard className="size-3.5 mr-1.5" />
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
