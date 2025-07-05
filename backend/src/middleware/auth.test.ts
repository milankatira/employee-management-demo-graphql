import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './auth';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

describe('authMiddleware', () => {
  beforeEach(() => {
    (jwt.verify as jest.Mock).mockReset();
    (jwt.sign as jest.Mock).mockReset();
  });

  it('should return unauthorized if no token is provided', () => {
    const req = { headers: {} };
    const context = authMiddleware(req);
    expect(() => context.checkRole(['admin'])).toThrow(AuthenticationError);
    expect(() => context.checkRole(['admin'])).toThrow('Unauthorized');
  });

  it('should return unauthorized if an invalid token is provided', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('invalid token');
    });
    const req = { headers: { authorization: 'Bearer invalidtoken' } };
    const context = authMiddleware(req);
    expect(() => context.checkRole(['admin'])).toThrow(AuthenticationError);
    expect(() => context.checkRole(['admin'])).toThrow('Unauthorized');
  });

  it('should allow access if a valid token with the correct role is provided', () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: '123', role: 'admin' });
    const req = { headers: { authorization: `Bearer validtoken` } };
    const context = authMiddleware(req);
    expect(() => context.checkRole(['admin'])).not.toThrow();
  });

  it('should throw forbidden if a valid token with an incorrect role is provided', () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: '123', role: 'employee' });
    const req = { headers: { authorization: `Bearer validtoken` } };
    const context = authMiddleware(req);
    expect(() => context.checkRole(['admin'])).toThrow('Forbidden');
  });
});
