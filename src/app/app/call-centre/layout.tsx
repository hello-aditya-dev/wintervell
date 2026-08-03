'use client';

import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CallCentreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-700 dark:text-amber-300 text-xs">
          Frontend workflow demonstration. No telephony provider is connected and no real call is placed, received or recorded.
        </AlertDescription>
      </Alert>
      {children}
    </div>
  );
}
