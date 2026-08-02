'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

import { useDemoStore } from '@/demo/state/demo-store';
import type { DemoUser } from '@/demo/fixtures/users';
import { PageHeader, DemoLabel, PersonAvatar } from '@/components/shared';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// ── Column definitions ───────────────────────────────────────────────────

function getColumns(): ColumnDef<DemoUser>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Member',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <PersonAvatar name={row.original.name} size="sm" />
          <span className="text-sm font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px]">{row.original.role}</Badge>
      ),
    },
    {
      accessorKey: 'avatar',
      header: 'Initials',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{row.original.avatar}</span>
      ),
    },
  ];
}

// ── Page component ───────────────────────────────────────────────────────

export default function TeamPage() {
  const users = useDemoStore((s) => s.users);

  const columns = React.useMemo(() => getColumns(), []);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <PageHeader
        title="Team"
        description="Demo team members in the demonstration workspace."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
          </div>
        }
      />

      <div className="rounded-md border">
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        These are demonstration team members. No invitations have been sent. Team management is a demonstration feature.
      </p>
    </div>
  );
}
