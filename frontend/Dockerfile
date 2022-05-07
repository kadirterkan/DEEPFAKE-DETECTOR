FROM node:17
RUN apt-get update
WORKDIR /app/frontend
COPY . /app/frontend
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]