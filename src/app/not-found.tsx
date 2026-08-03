import Link from 'next/link';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-background">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Page not found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. You can head back to the homepage or explore the product demo.
      </p>
      <div className="flex items-center gap-3">
        <Button asChild size="sm">
          <Link href="/">
            <Home className="size-3.5 mr-1.5" />
            Homepage
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/demo">
            <ArrowLeft className="size-3.5 mr-1.5" />
            Product Demo
          </Link>
        </Button>
      </div>
    </div>
  );
}
