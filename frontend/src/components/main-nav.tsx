'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { ThemeToggle } from "@/components/theme-toggle";

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex items-center">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <span className="hidden font-bold lg:inline-block">
          Employee App
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="#"
          className={cn(
            "transition-colors hover:text-foreground/80",
            "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="#"
          className={cn(
            "transition-colors hover:text-foreground/80",
            "text-foreground/60"
          )}
        >
          Reports
        </Link>
        <Link
          href="#"
          className={cn(
            "transition-colors hover:text-foreground/80",
            "text-foreground/60"
          )}
        >
          Settings
        </Link>
      </nav>
      <div className="flex-1 flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
