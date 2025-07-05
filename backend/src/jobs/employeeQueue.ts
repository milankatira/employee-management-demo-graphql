import { Queue, Worker, Job } from 'bullmq';
import { Employee } from '../models/Employee';
import redisConnection from '../lib/redis';

export const employeeQueue = new Queue('employeeQueue', {
  connection: redisConnection,
});

new Worker(
  'employeeQueue',
  async (job: Job) => {
    if (job.name === 'bulkAdd') {
      await Employee.insertMany(job.data.employees);
    }
  },
  { connection: redisConnection },
);
