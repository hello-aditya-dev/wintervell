'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { DemoCampaign } from '@/demo/types/call-centre';
import { PageHeader, DemoLabel } from '@/components/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// ── Campaign status styling ──────────────────────────────────────────────

const campaignStatusStyles: Record<string, { label: string; className: string }> = {
  'active-demo': { label: 'Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'paused-demo': { label: 'Paused', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'completed-demo': { label: 'Completed', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
  planned: { label: 'Planned', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
};

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(): ColumnDef<DemoCampaign>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Campaign <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <span className="text-sm font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: 'contactCount',
      header: 'Contacts',
      cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.contactCount}</span>,
    },
    {
      accessorKey: 'attempted',
      header: 'Attempted',
      cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.attempted}</span>,
    },
    {
      accessorKey: 'connectedDemo',
      header: 'Connected',
      cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.connectedDemo}</span>,
    },
    {
      accessorKey: 'followUp',
      header: 'Follow-up',
      cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.followUp}</span>,
    },
    {
      accessorKey: 'completed',
      header: 'Completed',
      cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.completed}</span>,
    },
    {
      accessorKey: 'assignedTeam',
      header: 'Team',
      cell: ({ row }) => <span className="text-xs">{row.original.assignedTeam}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const style = campaignStatusStyles[row.original.status] ?? { label: row.original.status, className: 'bg-muted text-muted-foreground border-border' };
        return (
          <Badge variant="outline" className={cn('text-[10px] font-medium', style.className)}>
            {style.label}
          </Badge>
        );
      },
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function CampaignsListPage() {
  const campaigns = useDemoStore((s) => s.campaigns);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(() => getColumns(), []);

  const table = useReactTable({
    data: campaigns,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Outbound calling campaigns and progress tracking."
        actions={<DemoLabel />}
      />

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
