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
import { ArrowUpDown, Plus } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Proposal, ProposalStatus } from '@/demo/types/proposal';
import { PageHeader, FilterBar, StatusBadge, CurrencyValue, DateValue, DemoLabel } from '@/components/shared';
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
    { label: 'Sent', value: 'sent_demo' },
    { label: 'Accepted', value: 'accepted_demo' },
    { label: 'Rejected', value: 'rejected_demo' },
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
  prospects: { id: string; company: string }[],
  audits: { id: string; title: string }[]
): ColumnDef<Proposal>[] {
  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const prospectMap = new Map(prospects.map((p) => [p.id, p.company]));
  const auditMap = new Map(audits.map((a) => [a.id, a.title]));

  return [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Proposal <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/app/proposals/${row.original.id}`}
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
      id: 'audit',
      header: 'Audit',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground truncate max-w-[180px] block">
          {auditMap.get(row.original.auditId) ?? '—'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status as ProposalStatus} category="proposal" />,
    },
    {
      accessorKey: 'totalValue',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Value <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <CurrencyValue value={row.original.totalValue} compact />,
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      cell: ({ row }) => (
        <span className="text-xs">{userMap.get(row.original.owner) ?? row.original.owner}</span>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated',
      cell: ({ row }) => <DateValue value={row.original.updatedAt} relative />,
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function ProposalsPage() {
  const router = useRouter();
  const proposals = useDemoStore((s) => s.proposals);
  const prospects = useDemoStore((s) => s.prospects);
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
    let data = proposals;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (statusFilter) data = data.filter((p) => p.status === statusFilter);
    if (ownerFilter) data = data.filter((p) => p.owner === ownerFilter);
    return data;
  }, [proposals, search, statusFilter, ownerFilter]);

  const columns = React.useMemo(() => getColumns(users, prospects, audits), [users, prospects, audits]);

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
        title="Proposals"
        description="Create and manage proposals for prospects."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search proposals…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...statusOptions, value: statusFilter, onChange: setStatusFilter },
          { ...ownerOptions, value: ownerFilter, onChange: setOwnerFilter },
        ]}
      />

      <div className="mt-4 rounded-md border">
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
                <TableRow key={row.id} className="cursor-pointer" onClick={() => router.push(`/app/proposals/${row.original.id}`)}>
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
                  No proposals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} proposal{filteredData.length !== 1 ? 's' : ''}
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
