import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.status(404).json({ message: 'nothing here' });
});

app.listen(3000, () => {
  console.log('server started');
});
