import { ApolloError } from 'apollo-server-express';

export class NotFoundError extends ApolloError {
  constructor(message: string, code?: string) {
    super(message, code || 'NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

export class InvalidInputError extends ApolloError {
  constructor(message: string, code?: string, properties?: Record<string, any>) {
    super(message, code || 'BAD_USER_INPUT', properties);
    Object.defineProperty(this, 'name', { value: 'InvalidInputError' });
  }
}

export class ForbiddenError extends ApolloError {
  constructor(message: string, code?: string) {
    super(message, code || 'FORBIDDEN');
    Object.defineProperty(this, 'name', { value: 'ForbiddenError' });
  }
}
