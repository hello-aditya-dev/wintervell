'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  CheckSquare,
  Search,
  FileText,
  FileCheck,
  Wrench,
  Palette,
  UserPlus,
  Plug,
  ChevronLeft,
  Shield,
} from 'lucide-react';

import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// ── Navigation definition ──────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/app', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Sales',
    items: [
      { label: 'Prospects', href: '/app/prospects', icon: Users },
      { label: 'Pipeline', href: '/app/pipeline', icon: GitBranch },
      { label: 'Tasks', href: '/app/tasks', icon: CheckSquare },
    ],
  },
  {
    title: 'Audit',
    items: [
      { label: 'Audits', href: '/app/audits', icon: Search },
      { label: 'Reports', href: '/app/reports', icon: FileText },
      { label: 'Proposals', href: '/app/proposals', icon: FileCheck },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { label: 'Services', href: '/app/services', icon: Wrench },
      { label: 'Branding', href: '/app/settings/branding', icon: Palette },
      { label: 'Team', href: '/app/settings/team', icon: UserPlus },
      { label: 'Integrations', href: '/app/settings/integrations', icon: Plug },
    ],
  },
];

// ── Sidebar component ──────────────────────────────────────────────────────

export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  function isActive(href: string): boolean {
    if (href === '/app') {
      return pathname === '/app';
    }
    return pathname.startsWith(href);
  }

  return (
    <SidebarPrimitive collapsible="icon" variant="sidebar" side="left">
      {/* ── Header ── */}
      <SidebarHeader className="p-3">
        <Link
          href="/app"
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-sidebar-accent',
            'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'
          )}
        >
          <Shield className="size-5 shrink-0 text-sidebar-primary" aria-hidden="true" />
          <span
            className={cn(
              'text-sm font-semibold tracking-tight text-sidebar-foreground',
              'group-data-[collapsible=icon]:sr-only'
            )}
          >
            WinterVell
          </span>
        </Link>
      </SidebarHeader>

      <Separator className="bg-sidebar-border" />

      {/* ── Navigation ── */}
      <SidebarContent className="scrollbar-wv">
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <Separator className="bg-sidebar-border" />

      {/* ── Footer ── */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Collapse sidebar">
              <button
                type="button"
                className="w-full"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft
                  className={cn(
                    'size-4 transition-transform duration-200',
                    state === 'collapsed' && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
                <span>Collapse</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </SidebarPrimitive>
  );
}
