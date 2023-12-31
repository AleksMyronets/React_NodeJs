import dotenv from 'dotenv';

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';
import userRouter from './routes/users.js';

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/contacts', contactsRouter);

app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

export default app;
