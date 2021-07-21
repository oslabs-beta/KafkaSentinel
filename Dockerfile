FROM node:14.16.1
#current node version is 14.16.1
#node version changed from 10.1 to be accurate to our app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN  npm install 
#RUN npm run dev
EXPOSE 3000
ENTRYPOINT [ "npm", "run dev" ]
