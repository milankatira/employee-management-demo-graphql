# API Backend

This is a GraphQL API backend built with Node.js, Express, Apollo Server, and MongoDB.

## Features

- Employee management (CRUD operations)
- User authentication and authorization (admin/employee roles)
- Bulk employee addition via a job queue
- Input validation using Joi
- Centralized logging with Winston
- Security enhancements with Helmet and Express Rate Limit
- Redis caching for frequently accessed data
- Comprehensive testing with Jest
- Code quality enforced with ESLint and Prettier

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/milankatira/employee-management-demo-graphql
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory with the following variables:
    ```
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/employee_db
    JWT_SECRET=your_jwt_secret_key
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

## Available Scripts

-   `yarn dev`: Starts the development server with hot-reloading.
-   `yarn build`: Compiles TypeScript to JavaScript.
-   `yarn start`: Starts the production server.
-   `yarn test`: Runs all tests.
-   `yarn lint`: Runs ESLint to check for code quality issues.
-   `yarn format`: Runs Prettier to format the code.

## API Endpoints

The GraphQL endpoint will be available at `http://localhost:<PORT>/graphql` (e.g., `http://localhost:4000/graphql`).

Refer to `src/graphql/schemas/typeDefs.ts` for the GraphQL schema and available queries/mutations.

## API Versioning Strategy

As the API evolves, a versioning strategy will be crucial to manage changes without breaking existing clients. Common approaches include:

-   **URL Versioning**: e.g., `/v1/graphql`, `/v2/graphql`
-   **Header Versioning**: Using a custom HTTP header like `X-API-Version: 1`
-   **Query Parameter Versioning**: e.g., `/graphql?version=1`

The current implementation does not explicitly use versioning, but it's a consideration for future development to ensure backward compatibility.

## Testing

To run tests, use:

```bash
yarn test
```

## Code Quality

To check code quality and format:

```bash
yarn lint
yarn format
```
