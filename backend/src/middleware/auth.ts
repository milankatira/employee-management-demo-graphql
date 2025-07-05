import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { ForbiddenError } from '../utils/customErrors';
import { JWT_SECRET } from '../utils/config';

export interface AuthContext {
  user: { id: string; role: string } | null;
  checkRole: (roles: string[]) => void;
}

export function authMiddleware(req: any): AuthContext {
  const header = req.headers.authorization || '';
  if (!header) {
    return {
      user: null,
      checkRole: () => {
        throw new AuthenticationError('Unauthorized');
      },
    };
  }

  try {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    return {
      user: decoded,
      checkRole: (roles: string[]) => {
        if (!roles.includes(decoded.role)) throw new ForbiddenError('Forbidden');
      },
    };
  } catch {
    return {
      user: null,
      checkRole: () => {
        throw new AuthenticationError('Unauthorized');
      },
    };
  }
}
