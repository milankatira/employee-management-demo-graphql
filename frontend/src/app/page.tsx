'use client';

import { useState } from 'react';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { EmployeeGridView } from '@/components/employee-grid-view';
import { EmployeeTileView } from '@/components/employee-tile-view';
import { EmployeeDetailDialog } from '@/components/employee-detail-dialog';
import { Button } from '@/components/ui/button';
import { useEmployees } from '@/hooks/use-employees';
import { Employee } from '@/types';
import { EmployeeSkeletonLoader } from '@/components/employee-skeleton-loader';
import { EmployeeGridSkeletonLoader } from '@/components/employee-grid-skeleton-loader';

export default function Home() {
  const { employees, loading, error } = useEmployees();
  const [view, setView] = useState<'grid' | 'tile'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleTileClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 max-w-7xl mx-auto">
          <MainNav />
          <MobileNav />
        </div>
      </header>
      <main className="flex-1 container py-8 max-w-7xl mx-auto">
        <div className="flex justify-end space-x-4 mb-4">
            <Button onClick={() => setView('grid')} variant={view === 'grid' ? 'default' : 'outline'}>
              Grid View
            </Button>
            <Button onClick={() => setView('tile')} variant={view === 'tile' ? 'default' : 'outline'}>
              Tile View
            </Button>
        </div>
        {loading ? (
          view === 'grid' ? (
            <EmployeeGridSkeletonLoader />
          ) : (
            <EmployeeSkeletonLoader />
          )
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-semibold text-red-500">{error}</p>
          </div>
        ) : employees.length > 0 ? (
          view === 'grid' ? (
            <EmployeeGridView employees={employees} onRowClick={handleTileClick} />
          ) : (
            <EmployeeTileView employees={employees} onTileClick={handleTileClick} />
          )
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-semibold">No employees found.</p>
          </div>
        )}
      </main>

      {selectedEmployee && (
        <EmployeeDetailDialog
          employee={selectedEmployee}
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
        />
      )}
    </div>
  );
}
