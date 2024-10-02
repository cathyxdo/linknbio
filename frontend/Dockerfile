# 1. Use the official Node.js image with version 20
FROM node:20-alpine

# 2. Set the folder where your app's files will live inside the container
WORKDIR /app

# 3. Copy your app's dependencies file (package.json)
COPY package.json package-lock.json ./

# 4. Install the dependencies inside the container
RUN npm install

# 5. Copy the rest of your app's code into the container
COPY . .

# 6. Expose port 3000 (the one Next.js uses) to the outside world
EXPOSE 3000

# 7. Command to start Next.js in development mode
CMD ["npm", "run", "dev"]
