'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

// ── Route label map ────────────────────────────────────────────────────────

const routeLabels: Record<string, string> = {
  app: 'Dashboard',
  prospects: 'Prospects',
  pipeline: 'Pipeline',
  tasks: 'Tasks',
  audits: 'Audits',
  reports: 'Reports',
  proposals: 'Proposals',
  services: 'Services',
  branding: 'Branding',
  team: 'Team',
  integrations: 'Integrations',
};

// ── Breadcrumbs component ──────────────────────────────────────────────────

interface BreadcrumbsProps {
  className?: string;
  overrides?: Record<string, string>;
}

export default function Breadcrumbs({ className, overrides }: BreadcrumbsProps) {
  const pathname = usePathname();

  const labels = { ...routeLabels, ...overrides };

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((seg, i, arr) => ({
      label: labels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      href: '/' + arr.slice(0, i + 1).join('/'),
      isLast: i === arr.length - 1,
    }));

  if (segments.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {segments.map((seg, i) => (
          <React.Fragment key={seg.href}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {seg.isLast ? (
                <BreadcrumbPage className="text-sm font-medium">
                  {seg.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={seg.href} className="text-sm" asChild>
                  <Link href={seg.href}>{seg.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
