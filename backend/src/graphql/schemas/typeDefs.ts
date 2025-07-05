import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employee {
    _id: ID!
    name: String
    age: Int
    class: String
    subjects: [String]
    attendance: Int
    role: String
  }

  input EmployeeInput {
    name: String
    age: Int
    class: String
    subjects: [String]
    attendance: Int
    role: String
  }

  type Query {
    employees(filter: String, limit: Int, offset: Int, sortField: String, sortOrder: Int): [Employee]
    employee(_id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String, age: Int, class: String, subjects: [String], attendance: Int, role: String): Employee

    updateEmployee(_id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Int): Employee

    login(name: String!, role: String!): String

    bulkAddEmployees(employees: [EmployeeInput]): Boolean
  }
`;
