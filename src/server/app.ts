import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import './mongo';
import router from './controllers/api';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.use(router);

export default app;
