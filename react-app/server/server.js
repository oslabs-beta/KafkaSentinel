const express = require('express');
const cookieParser = require('cookie-parser');
const connectController = require('./controllers/connectController');
const cookieController = require('./controllers/cookieController');
const kafkaController = require('./controllers/kafkaController');
const bodyParser = require('body-parser');


const PORT = 3000;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.post('/connectKafka', connectController.checkConnection, cookieController.createCookie, (req, res, next) => {
  try {
    res.status(200).json({ connected: res.locals.connected });
  } catch (error) {
    next(error);
  }
});


app.use('/checkCookie', cookieController.checkCookie, connectController.checkConnection, (req, res, next) => {
  try {
    res.status(200).json({ connected: res.locals.connected });
  } catch (error) {
    next(error);
  }
});

app.use('/getClusterInfo', kafkaController.getClusterInfo, (req, res, next) => {
  try {
    res.status(200).json({ connected: true });
  } catch (error) {
    next(error);
  }
});


app.get('/', (req, res, next) => {
  res.status(404).json({ message: 'nothing here' });
});


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



app.listen(PORT, () => {
  console.log('server started');
});

module.exports = app;