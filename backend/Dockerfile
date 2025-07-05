# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
# where available (npm ci uses package-lock.json, yarn uses yarn.lock)
COPY package.json yarn.lock ./ 

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN yarn build

# Expose the port the app runs on
EXPOSE 4000

# Run the application
CMD ["yarn", "start"]
