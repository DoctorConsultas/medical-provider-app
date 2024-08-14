# Use the official Node image as a base image
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Use a lightweight base image for the final image
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist/medical-provider-app/browser /usr/share/nginx/html

# Copy a startup script
COPY ./docker-entrypoint.sh /usr/local/bin/

# Make the script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Set the entry point to the startup script
ENTRYPOINT ["docker-entrypoint.sh"]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
