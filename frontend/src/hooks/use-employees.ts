import { useState, useEffect } from 'react';
import { Employee } from '@/types';

interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Employee[] = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError('Failed to load employees. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  return { employees, loading, error };
}
