"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn(),
}));
describe('authMiddleware', () => {
    beforeEach(() => {
        jsonwebtoken_1.default.verify.mockReset();
        jsonwebtoken_1.default.sign.mockReset();
    });
    it('should return unauthorized if no token is provided', () => {
        const req = { headers: {} };
        const context = (0, auth_1.authMiddleware)(req);
        expect(() => context.checkRole(['admin'])).toThrow(apollo_server_express_1.AuthenticationError);
        expect(() => context.checkRole(['admin'])).toThrow('Unauthorized');
    });
    it('should return unauthorized if an invalid token is provided', () => {
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error('invalid token');
        });
        const req = { headers: { authorization: 'Bearer invalidtoken' } };
        const context = (0, auth_1.authMiddleware)(req);
        expect(() => context.checkRole(['admin'])).toThrow(apollo_server_express_1.AuthenticationError);
        expect(() => context.checkRole(['admin'])).toThrow('Unauthorized');
    });
    it('should allow access if a valid token with the correct role is provided', () => {
        jsonwebtoken_1.default.verify.mockReturnValue({ id: '123', role: 'admin' });
        const req = { headers: { authorization: `Bearer validtoken` } };
        const context = (0, auth_1.authMiddleware)(req);
        expect(() => context.checkRole(['admin'])).not.toThrow();
    });
    it('should throw forbidden if a valid token with an incorrect role is provided', () => {
        jsonwebtoken_1.default.verify.mockReturnValue({ id: '123', role: 'employee' });
        const req = { headers: { authorization: `Bearer validtoken` } };
        const context = (0, auth_1.authMiddleware)(req);
        expect(() => context.checkRole(['admin'])).toThrow('Forbidden');
    });
});
