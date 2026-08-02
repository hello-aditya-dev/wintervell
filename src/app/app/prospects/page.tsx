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
import { Plus, Download, ArrowUpDown, ExternalLink } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Prospect, ProspectStage, Industry } from '@/demo/types/prospect';
import { PageHeader, FilterBar, StatusBadge, CurrencyValue, DateValue, DemoLabel } from '@/components/shared';
import type { FilterSelect } from '@/components/shared/FilterBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

// ── Stage / Industry labels ──────────────────────────────────────────────

const stageOptions: FilterSelect = {
  key: 'stage',
  placeholder: 'Stage',
  options: [
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Proposal Sent', value: 'proposal_sent' },
    { label: 'Won', value: 'won' },
    { label: 'Lost', value: 'lost' },
  ],
};

const industryOptions: FilterSelect = {
  key: 'industry',
  placeholder: 'Industry',
  options: [
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Legal', value: 'legal' },
    { label: 'Finance', value: 'finance' },
    { label: 'Education', value: 'education' },
    { label: 'Retail', value: 'retail' },
    { label: 'Technology', value: 'technology' },
    { label: 'Real Estate', value: 'real_estate' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Construction', value: 'construction' },
    { label: 'Other', value: 'other' },
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

function getColumns(users: { id: string; name: string }[]): ColumnDef<Prospect>[] {
  const userMap = new Map(users.map((u) => [u.id, u.name]));

  return [
    {
      accessorKey: 'company',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/app/prospects/${row.original.id}`}
          className="font-medium text-foreground hover:underline"
        >
          {row.original.company}
        </Link>
      ),
    },
    {
      accessorKey: 'contactName',
      header: 'Contact',
      cell: ({ row }) => (
        <span className="text-sm">{row.original.contactName}</span>
      ),
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: ({ row }) => (
        <a
          href={row.original.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
        >
          {row.original.website.replace(/^https?:\/\//, '')}
          <ExternalLink className="size-3" />
        </a>
      ),
    },
    {
      accessorKey: 'industry',
      header: 'Industry',
      cell: ({ row }) => (
        <span className="text-xs capitalize">
          {row.original.industry.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      accessorKey: 'stage',
      header: 'Stage',
      cell: ({ row }) => <StatusBadge status={row.original.stage as ProspectStage} category="prospect" />,
    },
    {
      accessorKey: 'assignedOwner',
      header: 'Owner',
      cell: ({ row }) => (
        <span className="text-xs">{userMap.get(row.original.assignedOwner) ?? row.original.assignedOwner}</span>
      ),
    },
    {
      id: 'latestAudit',
      header: 'Latest Audit',
      cell: ({ row }) => {
        if (!row.original.latestAuditId) return <span className="text-muted-foreground text-xs">—</span>;
        return (
          <Link
            href={`/app/audits/${row.original.latestAuditId}`}
            className="text-xs text-primary hover:underline"
          >
            View audit
          </Link>
        );
      },
    },
    {
      accessorKey: 'estimatedValue',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Opp. Value <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <CurrencyValue value={row.original.estimatedValue} compact />,
    },
    {
      accessorKey: 'nextAction',
      header: 'Next Action',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[160px]">
          {row.original.nextAction || '—'}
        </span>
      ),
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function ProspectsPage() {
  const router = useRouter();
  const prospects = useDemoStore((s) => s.prospects);
  const audits = useDemoStore((s) => s.audits);
  const users = useDemoStore((s) => s.users);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [stageFilter, setStageFilter] = React.useState('');
  const [industryFilter, setIndustryFilter] = React.useState('');
  const [ownerFilter, setOwnerFilter] = React.useState('');

  const hasActiveFilters = !!(search || stageFilter || industryFilter || ownerFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStageFilter('');
    setIndustryFilter('');
    setOwnerFilter('');
  }, []);

  const filteredData = React.useMemo(() => {
    let data = prospects;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.company.toLowerCase().includes(q) ||
          p.contactName.toLowerCase().includes(q) ||
          p.website.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q)
      );
    }
    if (stageFilter) data = data.filter((p) => p.stage === stageFilter);
    if (industryFilter) data = data.filter((p) => p.industry === industryFilter);
    if (ownerFilter) data = data.filter((p) => p.assignedOwner === ownerFilter);
    return data;
  }, [prospects, search, stageFilter, industryFilter, ownerFilter]);

  const columns = React.useMemo(() => getColumns(users), [users]);

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

  const handleExport = () => {
    toast.success('Demo export generated', { description: 'Data exported from demonstration workspace.' });
  };

  return (
    <div>
      <PageHeader
        title="Prospects"
        description="Manage your prospect pipeline and client relationships."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="size-3.5 mr-1" /> Export
            </Button>
            <Button size="sm" asChild>
              <Link href="/app/prospects/new">
                <Plus className="size-3.5 mr-1" /> Create Prospect
              </Link>
            </Button>
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search prospects…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...stageOptions, value: stageFilter, onChange: setStageFilter },
          { ...industryOptions, value: industryFilter, onChange: setIndustryFilter },
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
                <TableRow key={row.id} className="cursor-pointer" onClick={() => router.push(`/app/prospects/${row.original.id}`)}>
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
                  No prospects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} prospect{filteredData.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
