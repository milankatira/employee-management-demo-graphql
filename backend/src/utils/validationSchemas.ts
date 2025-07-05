import Joi from 'joi';

export const addEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0),
  class: Joi.string(),
  subjects: Joi.array().items(Joi.string()),
  attendance: Joi.number().integer().min(0),
  role: Joi.string().valid('admin', 'employee').default('employee'),
});

export const updateEmployeeSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string(),
  age: Joi.number().integer().min(0),
  class: Joi.string(),
  subjects: Joi.array().items(Joi.string()),
  attendance: Joi.number().integer().min(0),
});

export const loginSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().valid('admin', 'employee').required(),
});

export const bulkAddEmployeesSchema = Joi.object({
  employees: Joi.array().items(addEmployeeSchema).required(),
});

export const employeeFilterSchema = Joi.object({
  filter: Joi.string().allow('', null),
  limit: Joi.number().integer().min(1).default(10),
  offset: Joi.number().integer().min(0).default(0),
  sortField: Joi.string().default('name'),
  sortOrder: Joi.number().valid(1, -1).default(1),
});

export const employeeIdSchema = Joi.object({
  _id: Joi.string().required(),
});
