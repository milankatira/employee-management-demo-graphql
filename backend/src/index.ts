import express, { Application } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/schemas/typeDefs';
import { resolvers } from './graphql/resolvers/resolvers';
import { authMiddleware } from './middleware/auth';
import { PORT, MONGO_URI } from './utils/config';
import logger from './utils/logger';

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('✅ Connected to MongoDB');

    const app: Application = express();

    app.use(helmet());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again after 15 minutes',
    });

    app.use(limiter);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        ...authMiddleware(req),
      }),
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        return error;
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      logger.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    logger.error('❌ Server failed to start:', err);
  }
})();
