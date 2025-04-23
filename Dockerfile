# Use Alpine-based Node image
FROM node:22-slim

# Install git (and optionally build tools)
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    python3 \
 && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY server/ .

# Expose the port your app listens on
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
