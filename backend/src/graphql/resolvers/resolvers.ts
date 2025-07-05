import { IResolvers } from '@graphql-tools/utils';
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express';
import { NotFoundError} from '../../utils/customErrors';
import { Employee } from '../../models/Employee';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/config';
import { employeeQueue } from '../../jobs/employeeQueue';
import { AuthContext } from '../../middleware/auth';
import redisConnection from '../../lib/redis';
import {
  addEmployeeSchema,
  updateEmployeeSchema,
  loginSchema,
  bulkAddEmployeesSchema,
  employeeFilterSchema,
  employeeIdSchema,
} from '../../utils/validationSchemas';

export const resolvers: IResolvers = {
  Query: {
    employees: async (_, args, context: AuthContext) => {
      try {
        context.checkRole(['admin']);
        const { error, value } = employeeFilterSchema.validate(args);
        if (error) {
          throw new UserInputError('Validation Error', { validationErrors: error.details });
        }
        const { filter, limit, offset, sortField, sortOrder } = value;

        const query = filter ? { name: new RegExp(filter, 'i') } : {};
        const employees = await Employee.find(query)
          .sort({ [sortField]: sortOrder })
          .skip(offset)
          .limit(limit)
          .lean();
        return employees;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new ApolloError(`Failed to fetch employees: ${error.message}`, 'FETCH_EMPLOYEES_ERROR');
        } else {
          throw new ApolloError('An unknown error occurred while fetching employees', 'UNKNOWN_ERROR');
        }
      }
    },

    employee: async (_, args, context: AuthContext) => {
      try {
        context.checkRole(['admin', 'employee']);
        const { error, value } = employeeIdSchema.validate(args);
        if (error) {
          throw new UserInputError('Validation Error', { validationErrors: error.details });
        }
        const { _id } = value;

        const cacheKey = `employee:${_id}`;
        const cachedEmployee = await redisConnection.get(cacheKey);

        if (cachedEmployee) {
          return JSON.parse(cachedEmployee);
        }

        const employee = await Employee.findById(_id);
        if (!employee) {
          throw new NotFoundError('Employee not found');
        }

        await redisConnection.setex(cacheKey, 3600, JSON.stringify(employee));

        return employee;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new ApolloError(`Failed to fetch employee: ${error.message}`, 'FETCH_EMPLOYEE_ERROR');
        } else {
          throw new ApolloError('An unknown error occurred while fetching employee', 'UNKNOWN_ERROR');
        }
      }
    },
  },

  Mutation: {
    addEmployee: async (_, args, context: AuthContext) => {
      try {
        context.checkRole(['admin']);
        const { error, value } = addEmployeeSchema.validate(args);
        if (error) {
          throw new UserInputError('Validation Error', { validationErrors: error.details });
        }
        const employee = new Employee(value);
        const savedEmployee = await employee.save();
        await redisConnection.del(`employee:${savedEmployee._id}`);
        return savedEmployee;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new ApolloError(`Failed to add employee: ${error.message}`, 'ADD_EMPLOYEE_ERROR');
        } else {
          throw new ApolloError('An unknown error occurred while adding employee', 'UNKNOWN_ERROR');
        }
      }
    },

    updateEmployee: async (_, args, context: AuthContext) => {
      try {
        context.checkRole(['admin']);
        const { error, value } = updateEmployeeSchema.validate(args);
        if (error) {
          throw new UserInputError('Validation Error', { validationErrors: error.details });
        }
        const { _id, ...updateArgs } = value;

        const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateArgs, { new: true });
        if (!updatedEmployee) {
          throw new NotFoundError('Employee not found');
        }
        await redisConnection.del(`employee:${_id}`);
        return updatedEmployee;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new ApolloError(`Failed to update employee: ${error.message}`, 'UPDATE_EMPLOYEE_ERROR');
        } else {
          throw new ApolloError('An unknown error occurred while updating employee', 'UNKNOWN_ERROR');
        }
      }
    },

    login: async (_, args, context: AuthContext) => {
      try {
        const { error, value } = loginSchema.validate(args);
        if (error) {
          throw new UserInputError('Validation Error', { validationErrors: error.details });
        }
        const { name, role } = value;

        const user = await Employee.findOne({ name, role });
        if (!user) throw new AuthenticationError('Invalid credentials');
        return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
      } catch (error) {
        if (error instanceof UserInputError || error instanceof AuthenticationError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new ApolloError(`Login failed: ${error.message}`, 'LOGIN_ERROR');
        } else {
          throw new ApolloError('An unknown error occurred during login', 'UNKNOWN_ERROR');
        }
      }
    },

    bulkAddEmployees: async (_, args, context: AuthContext) => {
      try {
        context.checkRole(['admin']);
        const { error, value } = bulkAddEmployeesSchema.validate(args);
        if (error) {
          throw new UserInputError('Validation Error', { validationErrors: error.details });
        }
        const { employees } = value;

        await employeeQueue.add('bulkAdd', { employees });
        return true;
      } catch (error) {
        if (error instanceof UserInputError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new ApolloError(`Failed to bulk add employees: ${error.message}`, 'BULK_ADD_EMPLOYEES_ERROR');
        } else {
          throw new ApolloError('An unknown error occurred while bulk adding employees', 'UNKNOWN_ERROR');
        }
      }
    },
  },
};
