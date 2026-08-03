'use client';

import * as React from 'react';
import Link from 'next/link';
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
import { ArrowUpDown, CheckCircle2, Circle, Clock } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Task, TaskPriority, TaskStatus } from '@/demo/types/task';
import { PageHeader, FilterBar, StatusBadge, DateValue, DemoLabel } from '@/components/shared';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// ── Filter options ───────────────────────────────────────────────────────

const priorityOptions: FilterSelect = {
  key: 'priority',
  placeholder: 'Priority',
  options: [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ],
};

const statusOptions: FilterSelect = {
  key: 'status',
  placeholder: 'Status',
  options: [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
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

// ── Priority badge ───────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config: Record<TaskPriority, { label: string; className: string }> = {
    high: { label: 'High', className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400' },
    medium: { label: 'Medium', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400' },
    low: { label: 'Low', className: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400' },
  };
  const c = config[priority];
  return <Badge variant="outline" className={cn('text-[10px] font-medium', c.className)}>{c.label}</Badge>;
}

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(
  users: { id: string; name: string }[],
  prospects: { id: string; company: string }[],
  audits: { id: string; title: string }[],
  proposals: { id: string; title: string }[],
  onStatusChange: (taskId: string, status: TaskStatus) => void
): ColumnDef<Task>[] {
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
          Task <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date <ArrowUpDown className="size-3" />
        </button>
      ),
      cell: ({ row }) => <DateValue value={row.original.dueDate} formatStr="d MMM" />,
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
    },
    {
      id: 'prospect',
      header: 'Prospect',
      cell: ({ row }) => {
        if (!row.original.prospectId) return <span className="text-muted-foreground text-xs">—</span>;
        return (
          <Link href={`/app/prospects/${row.original.prospectId}`} className="text-xs hover:underline">
            {prospectMap.get(row.original.prospectId) ?? '—'}
          </Link>
        );
      },
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      cell: ({ row }) => (
        <span className="text-xs">{userMap.get(row.original.owner) ?? row.original.owner}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Select
          value={row.original.status}
          onValueChange={(v) => onStatusChange(row.original.id, v as TaskStatus)}
        >
          <SelectTrigger className="h-7 w-[120px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: 'related',
      header: 'Related',
      cell: ({ row }) => {
        const items: React.ReactNode[] = [];
        if (row.original.relatedAuditId) {
          items.push(
            <Link key="audit" href={`/app/audits/${row.original.relatedAuditId}`} className="text-[10px] text-primary hover:underline">
              Audit
            </Link>
          );
        }
        if (row.original.relatedProposalId) {
          items.push(
            <Link key="proposal" href={`/app/proposals/${row.original.relatedProposalId}`} className="text-[10px] text-primary hover:underline">
              Proposal
            </Link>
          );
        }
        return items.length > 0 ? <div className="flex gap-1.5">{items}</div> : <span className="text-xs text-muted-foreground">—</span>;
      },
    },
  ];
}

import { cn } from '@/lib/utils';

// ── Page component ───────────────────────────────────────────────────────

export default function TasksPage() {
  const tasks = useDemoStore((s) => s.tasks);
  const setTasks = useDemoStore((s) => s.setTasks);
  const prospects = useDemoStore((s) => s.prospects);
  const audits = useDemoStore((s) => s.audits);
  const proposals = useDemoStore((s) => s.proposals);
  const users = useDemoStore((s) => s.users);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [priorityFilter, setPriorityFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [ownerFilter, setOwnerFilter] = React.useState('');

  const hasActiveFilters = !!(search || priorityFilter || statusFilter || ownerFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setPriorityFilter('');
    setStatusFilter('');
    setOwnerFilter('');
  }, []);

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString() } : t
    );
    setTasks(updated);
    toast.success('Task status updated');
  };

  const filteredData = React.useMemo(() => {
    let data = tasks;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((t) => t.title.toLowerCase().includes(q));
    }
    if (priorityFilter) data = data.filter((t) => t.priority === priorityFilter);
    if (statusFilter) data = data.filter((t) => t.status === statusFilter);
    if (ownerFilter) data = data.filter((t) => t.owner === ownerFilter);
    return data;
  }, [tasks, search, priorityFilter, statusFilter, ownerFilter]);

  const columns = React.useMemo(
    () => getColumns(users, prospects, audits, proposals, handleStatusChange),
    [users, prospects, audits, proposals]
  );

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
        title="Tasks"
        description="Track and manage your tasks and action items."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search tasks…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...priorityOptions, value: priorityFilter, onChange: setPriorityFilter },
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
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          {filteredData.length} task{filteredData.length !== 1 ? 's' : ''}
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
