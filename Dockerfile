FROM node:12

# Create app directory
WORKDIR /app/test_movies

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001
CMD [ "npm", "run", "start" ]
