import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Employee } from '@/types';

interface EmployeeDetailDialogProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

export function EmployeeDetailDialog({ employee, isOpen, onClose }: EmployeeDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{employee.name}</DialogTitle>
          <DialogDescription>
            Full details for {employee.name}.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <strong>Username:</strong> {employee.username}
          </div>
          <div>
            <strong>Email:</strong> {employee.email}
          </div>
          <div>
            <strong>Phone:</strong> {employee.phone}
          </div>
          <div>
            <strong>Website:</strong> {employee.website}
          </div>
          <div>
            <strong>Company:</strong> {employee.company.name}
          </div>
          <div>
            <strong>Address:</strong> {employee.address.street}, {employee.address.suite}, {employee.address.city}, {employee.address.zipcode}
          </div>
        </div>
        <div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
