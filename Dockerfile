FROM node:10.1 
#current node version is 14.16.1
WORKDIR /usr/src/app
COPY ./KafkaApp /usr/src/app
RUN  npm install 
#RUN npm run dev
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
