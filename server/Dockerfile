# Description: This file contains the instructions for building the Docker image for the server.

# Use the LTS version of Node.js as the base image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

# All the steps are separated as layers in the Docker image
# separating the step copy package.json and copy . . is a good practice to avoid rebuilding the image when there is no change in the package.json file
# this way, the dependencies will be installed only when there is a change in the package.json file
# the cached layers will be used when there is no change in the package.json file

# Expose the port 3000
EXPOSE 3000

# Run the server
CMD [ "npm", "start" ]