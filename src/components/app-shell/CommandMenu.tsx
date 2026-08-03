'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Search,
  FileText,
  FileCheck,
  GitBranch,
  Palette,
  Plus,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

// ── Command definitions ─────────────────────────────────────────────────────

interface CommandAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
}

// ── CommandMenu component ──────────────────────────────────────────────────

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();

  const navigate = React.useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [router, onOpenChange]
  );

  const navigationCommands: CommandAction[] = [
    {
      label: 'Go to Dashboard',
      icon: LayoutDashboard,
      action: () => navigate('/app'),
      keywords: ['home', 'overview'],
    },
    {
      label: 'View Prospects',
      icon: Users,
      action: () => navigate('/app/prospects'),
      keywords: ['leads', 'contacts', 'sales'],
    },
    {
      label: 'View Pipeline',
      icon: GitBranch,
      action: () => navigate('/app/pipeline'),
      keywords: ['opportunities', 'deals', 'stages'],
    },
    {
      label: 'View Audits',
      icon: Search,
      action: () => navigate('/app/audits'),
      keywords: ['analysis', 'scans', 'reviews'],
    },
    {
      label: 'View Reports',
      icon: FileText,
      action: () => navigate('/app/reports'),
      keywords: ['documents', 'pdfs', 'exports'],
    },
    {
      label: 'View Proposals',
      icon: FileCheck,
      action: () => navigate('/app/proposals'),
      keywords: ['quotes', 'offers', 'deals'],
    },
    {
      label: 'Open Branding Settings',
      icon: Palette,
      action: () => navigate('/app/branding'),
      keywords: ['white-label', 'logo', 'theme', 'colors'],
    },
  ];

  const actionCommands: CommandAction[] = [
    {
      label: 'New Prospect',
      icon: Plus,
      action: () => navigate('/app/prospects'),
      keywords: ['add', 'lead', 'contact'],
    },
    {
      label: 'New Audit',
      icon: Plus,
      action: () => navigate('/app/audits'),
      keywords: ['start', 'run', 'scan'],
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Actions">
          {actionCommands.map((cmd) => (
            <CommandItem
              key={cmd.label}
              onSelect={cmd.action}
              keywords={cmd.keywords}
            >
              <cmd.icon className="size-4" aria-hidden="true" />
              <span>{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          {navigationCommands.map((cmd) => (
            <CommandItem
              key={cmd.label}
              onSelect={cmd.action}
              keywords={cmd.keywords}
            >
              <cmd.icon className="size-4" aria-hidden="true" />
              <span>{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
