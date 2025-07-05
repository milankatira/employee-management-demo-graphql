import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Employee } from '@/types';

interface EmployeeTileViewProps {
  employees: Employee[];
  onTileClick: (employee: Employee) => void;
}

export function EmployeeTileView({ employees, onTileClick }: EmployeeTileViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {employees.map((employee) => (
        <Card key={employee.id} className="group cursor-pointer overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg" onClick={() => onTileClick(employee)}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">{employee.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{employee.company.name}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="truncate">Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-0">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="outline" size="sm">Flag</Button>
            <Button variant="destructive" size="sm" className="transition-colors duration-200 hover:bg-destructive/90">Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
