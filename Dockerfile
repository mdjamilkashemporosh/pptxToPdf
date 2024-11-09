# Dockerfile
FROM node:18-slim

# Install required packages and LibreOffice
RUN apt-get update && \
    apt-get install -y libreoffice libreoffice-core && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Specify the default command to run your app
CMD ["node", "index.js"]