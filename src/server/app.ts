import express from 'express';
import morgan from 'morgan';
import './mongo';
import graphql from './graphql';

const app = express();

app.use(morgan('combined'));

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.use('/graphql', graphql);

export default app;
