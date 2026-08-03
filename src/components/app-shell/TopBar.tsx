'use client';

import * as React from 'react';
import { Bell, Command, Building2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

// ── TopBar component ───────────────────────────────────────────────────────

interface TopBarProps {
  onCommandMenuOpen?: () => void;
}

export default function TopBar({ onCommandMenuOpen }: TopBarProps) {
  const pathname = usePathname();

  // Build breadcrumb segments from current route
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((seg, i, arr) => ({
      label: routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      href: '/' + arr.slice(0, i + 1).join('/'),
      isLast: i === arr.length - 1,
    }));

  return (
    <header
      className="flex h-12 shrink-0 items-center gap-2 border-b bg-surface px-4"
      role="banner"
    >
      {/* Sidebar trigger */}
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      {/* Breadcrumbs */}
      <Breadcrumb className="flex-1 min-w-0">
        <BreadcrumbList className="flex-nowrap">
          {segments.map((seg, i) => (
            <React.Fragment key={seg.href}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {seg.isLast ? (
                  <BreadcrumbPage className="text-sm font-medium">
                    {seg.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={seg.href} className="text-sm">
                    {seg.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Right side actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Organisation switcher (disabled placeholder) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs opacity-60 cursor-not-allowed"
              disabled
              aria-label="Organisation switcher (Demo)"
            >
              <Building2 className="size-3.5" aria-hidden="true" />
              <span>Demo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Organisation switcher (Demo)</TooltipContent>
        </Tooltip>

        {/* Demo indicator */}
        <Badge
          variant="outline"
          className="h-5 border-amber-300 bg-amber-50 text-amber-700 text-[10px] font-medium dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400"
        >
          Demo
        </Badge>

        {/* Command menu trigger */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs text-muted-foreground"
              onClick={onCommandMenuOpen}
              aria-label="Open command menu (Ctrl+K)"
            >
              <Command className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">⌘K</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Command menu (Ctrl+K)</TooltipContent>
        </Tooltip>

        {/* Notifications (disabled placeholder) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground opacity-60"
              disabled
              aria-label="Notifications (disabled)"
            >
              <Bell className="size-3.5" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications (Demo)</TooltipContent>
        </Tooltip>

        {/* User menu (disabled placeholder) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 opacity-60"
              disabled
              aria-label="User menu (disabled)"
            >
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">AM</AvatarFallback>
              </Avatar>
            </Button>
          </TooltipTrigger>
          <TooltipContent>User menu (Demo)</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
