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
import { Plus, ArrowUpDown } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Audit, AuditStatus, AuditMode } from '@/demo/types/audit';
import { PageHeader, FilterBar, StatusBadge, ScoreBadge, DateValue, DemoLabel } from '@/components/shared';
import type { FilterSelect } from '@/components/shared/FilterBar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// ── Filter options ───────────────────────────────────────────────────────

const statusOptions: FilterSelect = {
  key: 'status',
  placeholder: 'Status',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Ready', value: 'ready' },
    { label: 'Running', value: 'running_demo' },
    { label: 'Review Required', value: 'review_required' },
    { label: 'Approved', value: 'approved' },
    { label: 'Published', value: 'published' },
    { label: 'Failed', value: 'failed_demo' },
  ],
};

const modeOptions: FilterSelect = {
  key: 'mode',
  placeholder: 'Mode',
  options: [
    { label: 'Quick', value: 'quick' },
    { label: 'Standard', value: 'standard' },
    { label: 'Comprehensive', value: 'comprehensive' },
    { label: 'Manual Review', value: 'manual_review' },
  ],
};

const ownerOptions: FilterSelect = {
  key: 'owner',
  placeholder: 'Owner',
  options: [
    { label: 'Alex Morgan', value: 'user-1' },
    { label: 'Jordan Lee', value: 'user-2' },
    { label: 'Casey Rivera', value: 'user-3' },
  ],
};

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(
  users: { id: string; name: string }[],
  prospects: { id: string; company: string }[]
): ColumnDef<Audit>[] {
  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const prospectMap = new Map(prospects.map((p) => [p.id, p.company]));

  return [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Audit <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/app/audits/${row.original.id}`}
          className="font-medium text-foreground hover:underline"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      id: 'prospect',
      header: 'Prospect',
      cell: ({ row }) => (
        <span className="text-sm">{prospectMap.get(row.original.prospectId) ?? '—'}</span>
      ),
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.website.replace(/^https?:\/\//, '')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status as AuditStatus} category="audit" />,
    },
    {
      accessorKey: 'mode',
      header: 'Mode',
      cell: ({ row }) => (
        <span className="text-xs capitalize">{row.original.mode.replace(/_/g, ' ')}</span>
      ),
    },
    {
      accessorKey: 'overallScore',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Score <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => {
        if (row.original.overallScore === 0) return <span className="text-muted-foreground text-xs">—</span>;
        return <ScoreBadge score={row.original.overallScore} size="sm" />;
      },
    },
    {
      accessorKey: 'priorityFindingCount',
      header: 'Priority Findings',
      cell: ({ row }) => (
        <span className="text-xs tabular-nums">{row.original.priorityFindingCount}</span>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated',
      cell: ({ row }) => <DateValue value={row.original.updatedAt} relative />,
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      cell: ({ row }) => (
        <span className="text-xs">{userMap.get(row.original.owner) ?? row.original.owner}</span>
      ),
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function AuditsPage() {
  const router = useRouter();
  const audits = useDemoStore((s) => s.audits);
  const prospects = useDemoStore((s) => s.prospects);
  const users = useDemoStore((s) => s.users);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [modeFilter, setModeFilter] = React.useState('');
  const [ownerFilter, setOwnerFilter] = React.useState('');

  const hasActiveFilters = !!(search || statusFilter || modeFilter || ownerFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStatusFilter('');
    setModeFilter('');
    setOwnerFilter('');
  }, []);

  const filteredData = React.useMemo(() => {
    let data = audits;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.website.toLowerCase().includes(q)
      );
    }
    if (statusFilter) data = data.filter((a) => a.status === statusFilter);
    if (modeFilter) data = data.filter((a) => a.mode === modeFilter);
    if (ownerFilter) data = data.filter((a) => a.owner === ownerFilter);
    return data;
  }, [audits, search, statusFilter, modeFilter, ownerFilter]);

  const columns = React.useMemo(() => getColumns(users, prospects), [users, prospects]);

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
        title="Audits"
        description="Manage digital audits and review findings."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button size="sm" asChild>
              <Link href="/app/audits/new">
                <Plus className="size-3.5 mr-1" /> Create Audit
              </Link>
            </Button>
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search audits…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...statusOptions, value: statusFilter, onChange: setStatusFilter },
          { ...modeOptions, value: modeFilter, onChange: setModeFilter },
          { ...ownerOptions, value: ownerFilter, onChange: setOwnerFilter },
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
                <TableRow key={row.id} className="cursor-pointer" onClick={() => router.push(`/app/audits/${row.original.id}`)}>
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
                  No audits found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} audit{filteredData.length !== 1 ? 's' : ''}
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
