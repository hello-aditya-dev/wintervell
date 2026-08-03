'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ── FilterOption type ──────────────────────────────────────────────────────

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSelect {
  key: string;
  placeholder: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
}

// ── FilterBar component ────────────────────────────────────────────────────

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterSelect[];
  actions?: React.ReactNode;
  className?: string;
  onClear?: () => void;
  hasActiveFilters?: boolean;
}

export default function FilterBar({
  searchPlaceholder = 'Search…',
  searchValue,
  onSearchChange,
  filters = [],
  actions,
  className,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 sm:flex-row sm:items-center',
        className
      )}
      role="search"
      aria-label="Filter results"
    >
      {/* Search input */}
      <div className="relative flex-1 min-w-0 sm:max-w-xs">
        <Search
          className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="h-8 pl-8 text-sm"
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Filter selects */}
      {filters.map((filter) => (
        <Select
          key={filter.key}
          value={filter.value}
          onValueChange={filter.onChange}
        >
          <SelectTrigger className="h-8 w-auto min-w-[120px] text-sm">
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {/* Clear filters */}
      {hasActiveFilters && onClear && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs text-muted-foreground"
          onClick={onClear}
        >
          <X className="size-3" aria-hidden="true" />
          Clear
        </Button>
      )}

      {/* Action buttons */}
      {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
    </div>
  );
}
