const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const app = express();
import connectController from './controllers/connectController';
import cookieController from './controllers/cookieController';



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/connect', connectController);



app.get('/', (req, res, next) => {
  res.status(404).json({ message: 'nothing here' });
});

app.listen(PORT, () => {
  console.log('server started');
});

module.exports = app;