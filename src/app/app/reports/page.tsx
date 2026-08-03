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
import { ArrowUpDown, Plus, Eye } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Report, ReportStatus } from '@/demo/types/report';
import { PageHeader, FilterBar, StatusBadge, DateValue, DemoLabel } from '@/components/shared';
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
    { label: 'Published (Demo)', value: 'published_demo' },
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
  audits: { id: string; title: string }[]
): ColumnDef<Report>[] {
  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const auditMap = new Map(audits.map((a) => [a.id, a.title]));

  return [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Report <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/app/reports/${row.original.id}`}
          className="font-medium text-foreground hover:underline"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: 'clientName',
      header: 'Client',
      cell: ({ row }) => <span className="text-sm">{row.original.clientName}</span>,
    },
    {
      id: 'audit',
      header: 'Audit',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground truncate max-w-[200px] block">
          {auditMap.get(row.original.auditId) ?? '—'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status as ReportStatus} category="report" />,
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => <span className="text-xs">{row.original.brand}</span>,
    },
    {
      accessorKey: 'firstSharedAt',
      header: 'First Shared',
      cell: ({ row }) => <DateValue value={row.original.firstSharedAt} />,
    },
    {
      accessorKey: 'lastViewedAt',
      header: 'Last Viewed',
      cell: ({ row }) => <DateValue value={row.original.lastViewedAt} relative />,
    },
    {
      accessorKey: 'viewCount',
      header: 'Views',
      cell: ({ row }) => (
        <span className="text-xs tabular-nums inline-flex items-center gap-1">
          <Eye className="size-3" /> {row.original.viewCount}
          <span className="text-muted-foreground">(simulated)</span>
        </span>
      ),
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

export default function ReportsPage() {
  const router = useRouter();
  const reports = useDemoStore((s) => s.reports);
  const audits = useDemoStore((s) => s.audits);
  const users = useDemoStore((s) => s.users);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [ownerFilter, setOwnerFilter] = React.useState('');

  const hasActiveFilters = !!(search || statusFilter || ownerFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStatusFilter('');
    setOwnerFilter('');
  }, []);

  const filteredData = React.useMemo(() => {
    let data = reports;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.clientName.toLowerCase().includes(q)
      );
    }
    if (statusFilter) data = data.filter((r) => r.status === statusFilter);
    if (ownerFilter) data = data.filter((r) => r.owner === ownerFilter);
    return data;
  }, [reports, search, statusFilter, ownerFilter]);

  const columns = React.useMemo(() => getColumns(users, audits), [users, audits]);

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
        title="Reports"
        description="Build and share audit reports with clients."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search reports…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...statusOptions, value: statusFilter, onChange: setStatusFilter },
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
                <TableRow key={row.id} className="cursor-pointer" onClick={() => router.push(`/app/reports/${row.original.id}`)}>
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
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} report{filteredData.length !== 1 ? 's' : ''}
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
