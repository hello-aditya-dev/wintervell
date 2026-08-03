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
import { DemoAgentRepository } from '@/demo/repositories/agent-repository';
import type { CallCentreAgent, AgentPresence } from '@/demo/types/call-centre';
import { PageHeader, FilterBar, DemoLabel } from '@/components/shared';
import type { FilterSelect } from '@/components/shared/FilterBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Agent presence styling ───────────────────────────────────────────────

const presenceStyles: Record<AgentPresence, { label: string; className: string }> = {
  'available-demo': { label: 'Available', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'busy-demo': { label: 'Busy', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  'wrap-up-demo': { label: 'Wrap-up', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'break-demo': { label: 'Break', className: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800' },
  'offline-demo': { label: 'Offline', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
};

const allPresences: { label: string; value: AgentPresence }[] = [
  { label: 'Available', value: 'available-demo' },
  { label: 'Busy', value: 'busy-demo' },
  { label: 'Wrap-up', value: 'wrap-up-demo' },
  { label: 'Break', value: 'break-demo' },
  { label: 'Offline', value: 'offline-demo' },
];

// ── Filter options ───────────────────────────────────────────────────────

const statusFilterOptions: FilterSelect = {
  key: 'status',
  placeholder: 'Status',
  options: allPresences.map((p) => ({ label: p.label, value: p.value })),
};

const teamFilterOptions: FilterSelect = {
  key: 'team',
  placeholder: 'Team',
  options: [
    { label: 'New enquiries', value: 'New enquiries' },
    { label: 'Existing customers', value: 'Existing customers' },
    { label: 'Follow-up calls', value: 'Follow-up calls' },
    { label: 'Technical support', value: 'Technical support' },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(
  onStatusChange: (agentId: string, newStatus: AgentPresence) => void
): ColumnDef<CallCentreAgent>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <span className="text-sm font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => <span className="text-xs">{row.original.role}</span>,
    },
    {
      accessorKey: 'team',
      header: 'Team',
      cell: ({ row }) => <span className="text-xs">{row.original.team}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const style = presenceStyles[row.original.status];
        return (
          <Select
            value={row.original.status}
            onValueChange={(value) => onStatusChange(row.original.id, value as AgentPresence)}
          >
            <SelectTrigger className="h-7 w-auto min-w-[90px] text-[10px]">
              <Badge variant="outline" className={cn('text-[10px] font-medium pointer-events-none', style.className)}>
                {style.label}
              </Badge>
            </SelectTrigger>
            <SelectContent>
              {allPresences.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: 'currentCallId',
      header: 'Current Call',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.currentCallId ?? '—'}
        </span>
      ),
    },
    {
      accessorKey: 'callsToday',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Calls Today <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.callsToday}</span>,
    },
    {
      accessorKey: 'talkTimeMinutes',
      header: 'Talk Time',
      cell: ({ row }) => <span className="text-xs tabular-nums">{formatMinutes(row.original.talkTimeMinutes)}</span>,
    },
    {
      accessorKey: 'followUpsDue',
      header: 'Follow-ups',
      cell: ({ row }) => (
        <span className="text-xs tabular-nums">
          {row.original.followUpsDue > 0 ? row.original.followUpsDue : '—'}
        </span>
      ),
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function AgentsListPage() {
  const agents = useDemoStore((s) => s.agents);
  const setAgents = useDemoStore((s) => s.setAgents);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [teamFilter, setTeamFilter] = React.useState('');

  const hasActiveFilters = !!(search || statusFilter || teamFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStatusFilter('');
    setTeamFilter('');
  }, []);

  const agentRepo = React.useMemo(
    () => new DemoAgentRepository(() => ({ agents, setAgents })),
    [agents, setAgents]
  );

  const filteredData = React.useMemo(() => {
    return agentRepo.list({
      status: (statusFilter || undefined) as AgentPresence | undefined,
      team: teamFilter || undefined,
      search: search || undefined,
    });
  }, [agentRepo, search, statusFilter, teamFilter]);

  const handleStatusChange = React.useCallback(
    (agentId: string, newStatus: AgentPresence) => {
      agentRepo.updatePresence(agentId, newStatus);
      toast.success('Demonstration agent status updated');
    },
    [agentRepo]
  );

  const columns = React.useMemo(() => getColumns(handleStatusChange), [handleStatusChange]);

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
        title="Agents"
        description="Manage call centre agents and their presence."
        actions={<DemoLabel />}
      />

      <FilterBar
        searchPlaceholder="Search agents…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...statusFilterOptions, value: statusFilter, onChange: setStatusFilter },
          { ...teamFilterOptions, value: teamFilter, onChange: setTeamFilter },
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
                  No agents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} agent{filteredData.length !== 1 ? 's' : ''}
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
