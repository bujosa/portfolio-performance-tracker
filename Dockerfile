FROM node:20.8.1-alpine3.14

# Set the working directory within the container to /app.
WORKDIR /app

# Copy the package.json and package-lock.json files to the container.
# This is done separately to take advantage of Docker caching.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy the rest of your application's source code to the container.
COPY . .

# Expose the port that your NestJS application will run on.
EXPOSE 3000

# Define the command to start your NestJS application.
CMD ["npm", "run", "start:prod"]