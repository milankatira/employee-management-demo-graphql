import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function EmployeeGridSkeletonLoader() {
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                <Skeleton className="h-5 w-10 mx-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
