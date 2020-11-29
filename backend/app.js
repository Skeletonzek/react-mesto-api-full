require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users.js');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().max(200).email().required(),
    password: Joi.string().required().min(2).max(200),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().max(200).email().required(),
    password: Joi.string().required().min(2).max(200),
  }),
}), createUser);

app.use('/', auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('/', (req, res, next) => {
  const error = new Error('Запрашиваемый ресурс не найден');
  error.statusCode = 404;
  next(error);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

app.listen(PORT);
