'use client';

import * as React from 'react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Employee App</span>
        </Link>
        <nav className="grid gap-2 text-sm">
          <Link
            href="#"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium hover:underline"
              >
                Reports
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" forceMount>
              <DropdownMenuItem>
                <Link href="#" onClick={() => setOpen(false)}>
                  Sales Report
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" onClick={() => setOpen(false)}>
                  HR Report
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="#"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
        </nav>
        <div className="mt-auto flex justify-center py-4">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
