FROM node
RUN apt-get update
WORKDIR /app/frontend
COPY ./src/main/deepfakedetector/package.json /app/frontend
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]