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
import type { Service, ServiceStatus, PricingModel } from '@/demo/types/service';
import { PageHeader, FilterBar, StatusBadge, CurrencyValue, DemoLabel } from '@/components/shared';
import type { FilterSelect } from '@/components/shared/FilterBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    { label: 'Active', value: 'active' },
    { label: 'Draft', value: 'draft' },
    { label: 'Archived', value: 'archived' },
  ],
};

const pricingOptions: FilterSelect = {
  key: 'pricingModel',
  placeholder: 'Pricing Model',
  options: [
    { label: 'Fixed', value: 'fixed' },
    { label: 'Hourly', value: 'hourly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Project', value: 'project' },
  ],
};

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(): ColumnDef<Service>[] {
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
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground line-clamp-2 max-w-[300px]">
          {row.original.description}
        </span>
      ),
    },
    {
      accessorKey: 'pricingModel',
      header: 'Pricing Model',
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px] capitalize">
          {row.original.pricingModel}
        </Badge>
      ),
    },
    {
      accessorKey: 'startingPrice',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Starting Price <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <CurrencyValue value={row.original.startingPrice} />,
    },
    {
      accessorKey: 'estimatedDuration',
      header: 'Duration',
      cell: ({ row }) => (
        <span className="text-xs">{row.original.estimatedDuration}</span>
      ),
    },
    {
      accessorKey: 'relatedFindingCategories',
      header: 'Finding Categories',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.relatedFindingCategories.slice(0, 3).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-[10px] capitalize">
              {cat.replace(/_/g, ' ')}
            </Badge>
          ))}
          {row.original.relatedFindingCategories.length > 3 && (
            <Badge variant="secondary" className="text-[10px]">
              +{row.original.relatedFindingCategories.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status as ServiceStatus} category="service" />,
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function ServicesPage() {
  const services = useDemoStore((s) => s.services);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [pricingFilter, setPricingFilter] = React.useState('');

  const hasActiveFilters = !!(search || statusFilter || pricingFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setStatusFilter('');
    setPricingFilter('');
  }, []);

  const filteredData = React.useMemo(() => {
    let data = services;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    if (statusFilter) data = data.filter((s) => s.status === statusFilter);
    if (pricingFilter) data = data.filter((s) => s.pricingModel === pricingFilter);
    return data;
  }, [services, search, statusFilter, pricingFilter]);

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
        title="Services"
        description="Manage your service catalogue and pricing."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search services…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...statusOptions, value: statusFilter, onChange: setStatusFilter },
          { ...pricingOptions, value: pricingFilter, onChange: setPricingFilter },
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
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} service{filteredData.length !== 1 ? 's' : ''}
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
