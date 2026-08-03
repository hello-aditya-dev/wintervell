'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { ArrowUpDown, PhoneIncoming, PhoneOutgoing } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import { DemoCallRepository } from '@/demo/repositories/call-repository';
import type { DemoCall, DemoCallStatus, CallDirection } from '@/demo/types/call-centre';
import { PageHeader, FilterBar, DemoLabel } from '@/components/shared';
import type { FilterSelect } from '@/components/shared/FilterBar';
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

// ── Status badge styles ──────────────────────────────────────────────────

const callStatusStyles: Record<string, { label: string; className: string }> = {
  'waiting-demo': { label: 'Waiting', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'ringing-demo': { label: 'Ringing', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  'connected-demo': { label: 'Connected', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'completed-demo': { label: 'Completed', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
  'missed-demo': { label: 'Missed', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  'follow-up-demo': { label: 'Follow-up', className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800' },
};

function CallStatusBadge({ status }: { status: string }) {
  const style = callStatusStyles[status] ?? { label: status, className: 'bg-muted text-muted-foreground border-border' };
  return (
    <Badge variant="outline" className={cn('text-[10px] font-medium', style.className)}>
      {style.label}
    </Badge>
  );
}

// ── Disposition label ────────────────────────────────────────────────────

const dispositionLabels: Record<string, string> = {
  qualified: 'Qualified',
  'not-interested': 'Not Interested',
  'callback-requested': 'Callback Requested',
  'no-answer': 'No Answer',
  'wrong-number': 'Wrong Number',
  resolved: 'Resolved',
  escalated: 'Escalated',
};

// ── Filter options ───────────────────────────────────────────────────────

const statusFilterOptions: FilterSelect = {
  key: 'status',
  placeholder: 'Status',
  options: [
    { label: 'Waiting', value: 'waiting-demo' },
    { label: 'Ringing', value: 'ringing-demo' },
    { label: 'Connected', value: 'connected-demo' },
    { label: 'Completed', value: 'completed-demo' },
    { label: 'Missed', value: 'missed-demo' },
    { label: 'Follow-up', value: 'follow-up-demo' },
  ],
};

const directionFilterOptions: FilterSelect = {
  key: 'direction',
  placeholder: 'Direction',
  options: [
    { label: 'Inbound', value: 'inbound' },
    { label: 'Outbound', value: 'outbound' },
  ],
};

const queueFilterOptions: FilterSelect = {
  key: 'queue',
  placeholder: 'Queue',
  options: [
    { label: 'New enquiries', value: 'queue-1' },
    { label: 'Existing customers', value: 'queue-2' },
    { label: 'Follow-up calls', value: 'queue-3' },
    { label: 'Technical support', value: 'queue-4' },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(): ColumnDef<DemoCall>[] {
  return [
    {
      accessorKey: 'contactName',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Contact <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/app/call-centre/calls/${row.original.id}`}
          className="font-medium text-foreground hover:underline"
        >
          {row.original.contactName}
        </Link>
      ),
    },
    {
      accessorKey: 'company',
      header: 'Company',
      cell: ({ row }) => <span className="text-xs">{row.original.company}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <span className="text-xs font-mono">{row.original.phone}</span>,
    },
    {
      accessorKey: 'direction',
      header: 'Direction',
      cell: ({ row }) => (
        <span className="text-xs inline-flex items-center gap-1">
          {row.original.direction === 'inbound' ? (
            <><PhoneIncoming className="size-3" />Inbound</>
          ) : (
            <><PhoneOutgoing className="size-3" />Outbound</>
          )}
        </span>
      ),
    },
    {
      accessorKey: 'queueName',
      header: 'Queue',
      cell: ({ row }) => <span className="text-xs">{row.original.queueName}</span>,
    },
    {
      accessorKey: 'assignedAgentName',
      header: 'Agent',
      cell: ({ row }) => (
        <span className="text-xs">{row.original.assignedAgentName ?? '—'}</span>
      ),
    },
    {
      accessorKey: 'startedAt',
      header: 'Started',
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatTime(row.original.startedAt)}</span>,
    },
    {
      accessorKey: 'durationSeconds',
      header: 'Duration',
      cell: ({ row }) => <span className="text-xs tabular-nums">{formatDuration(row.original.durationSeconds)}</span>,
    },
    {
      accessorKey: 'disposition',
      header: 'Disposition',
      cell: ({ row }) => (
        <span className="text-xs">
          {row.original.disposition ? (dispositionLabels[row.original.disposition] ?? row.original.disposition) : '—'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <CallStatusBadge status={row.original.status} />,
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function CallsListPage() {
  const router = useRouter();
  const calls = useDemoStore((s) => s.calls);
  const setCalls = useDemoStore((s) => s.setCalls);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [directionFilter, setDirectionFilter] = React.useState('');
  const [queueFilter, setQueueFilter] = React.useState('');

  const hasActiveFilters = !!(search || statusFilter || directionFilter || queueFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStatusFilter('');
    setDirectionFilter('');
    setQueueFilter('');
  }, []);

  const callRepo = React.useMemo(
    () => new DemoCallRepository(() => ({ calls, setCalls })),
    [calls, setCalls]
  );

  const filteredData = React.useMemo(() => {
    return callRepo.list({
      status: (statusFilter || undefined) as DemoCallStatus | undefined,
      direction: (directionFilter || undefined) as CallDirection | undefined,
      queueId: queueFilter || undefined,
      search: search || undefined,
    });
  }, [callRepo, search, statusFilter, directionFilter, queueFilter]);

  const columns = React.useMemo(() => getColumns(), []);

  const table = useReactTable({
    data: filteredData,
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
        title="Calls"
        description="View and manage call records."
        actions={<DemoLabel />}
      />

      <FilterBar
        searchPlaceholder="Search calls…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...statusFilterOptions, value: statusFilter, onChange: setStatusFilter },
          { ...directionFilterOptions, value: directionFilter, onChange: setDirectionFilter },
          { ...queueFilterOptions, value: queueFilter, onChange: setQueueFilter },
        ]}
      />

      <div className="mt-4 rounded-md border overflow-x-auto">
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
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/app/call-centre/calls/${row.original.id}`)}
                >
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
                  No calls found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} call{filteredData.length !== 1 ? 's' : ''}
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
