'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// ── PersonAvatar component ─────────────────────────────────────────────────

interface PersonAvatarProps {
  name: string;
  src?: string | null;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const sizeStyles = {
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
};

export default function PersonAvatar({
  name,
  src,
  initials,
  size = 'md',
  className,
}: PersonAvatarProps) {
  const displayInitials = initials ?? getInitials(name);

  return (
    <Avatar className={cn(sizeStyles[size], className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className="bg-muted text-muted-foreground font-medium">
        {displayInitials}
      </AvatarFallback>
    </Avatar>
  );
}
