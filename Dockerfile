# fix docker blocked
FROM dockerhub.timeweb.cloud/library/node:20-alpine

# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====

# Проброс ENV переменных в ARG
ARG NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG NEXTAUTH_URL=${NEXTAUTH_URL}

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD ["npm", "start"]
