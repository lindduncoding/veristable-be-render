# Use Alpine-based Node image
FROM node:22-alpine

RUN apk add --no-cache git

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
