# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app

# Expose the port on which your Node.js application will run

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout
ENV MYSQL_HOST="ip-172-31-93-86"
ENV MYSQL_USER="archit"
ENV MYSQL_PASSWORD="Password1!"
ENV MYSQL_DATABASE="employees_db"
ENV MYSQL_PORT="3306"
EXPOSE 8000


# Command to run the Node.js application
CMD ["node", "app.js"]

