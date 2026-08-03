'use client';

import * as React from 'react';

import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppSidebar from './Sidebar';
import TopBar from './TopBar';
import CommandMenu from './CommandMenu';
import DemoBanner from './DemoBanner';

// ── AppShell component ─────────────────────────────────────────────────────

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Global keyboard shortcut: Ctrl/Cmd+K opens command menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SidebarProvider
      defaultOpen={true}
      style={{ '--sidebar-width': '15rem' } as React.CSSProperties}
    >
      <AppSidebar />

      <SidebarInset className="flex min-h-svh flex-col">
        {/* Demo banner at the very top */}
        <DemoBanner />

        {/* Top bar */}
        <TopBar onCommandMenuOpen={() => setCommandOpen(true)} />

        {/* Main content area */}
        <main id="main-content" className="flex-1 overflow-auto p-4 md:p-6" role="main">
          {children}
        </main>
      </SidebarInset>

      {/* Global command menu */}
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </SidebarProvider>
  );
}
