import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/types';
import { formatPhoneNumber } from '@/lib/format-phone';

interface EmployeeGridViewProps {
  employees: Employee[];
  onRowClick: (employee: Employee) => void;
}

export function EmployeeGridView({ employees, onRowClick }: EmployeeGridViewProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[80px] text-center font-bold">ID</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Username</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Phone</TableHead>
            <TableHead className="font-bold">Website</TableHead>
            <TableHead className="font-bold">Company</TableHead>
            <TableHead className="font-bold">Address (Street)</TableHead>
            <TableHead className="font-bold">Address (City)</TableHead>
            <TableHead className="font-bold">Address (Zipcode)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              className="hover:bg-muted transition-colors cursor-pointer"
              onClick={() => onRowClick(employee)}
            >
              <TableCell className="font-medium text-center">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.username}</TableCell>
              <TableCell className="truncate max-w-[200px]" title={employee.email}>
                {employee.email}
              </TableCell>
              <TableCell>{formatPhoneNumber(employee.phone)}</TableCell>
              <TableCell className="truncate max-w-[150px]" title={employee.website}>
                {employee.website}
              </TableCell>
              <TableCell className="truncate max-w-[200px]" title={employee.company.name}>
                {employee.company.name}
              </TableCell>
              <TableCell className="truncate max-w-[200px]" title={employee.address.street}>
                {employee.address.street}
              </TableCell>
              <TableCell>{employee.address.city}</TableCell>
              <TableCell>{employee.address.zipcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
