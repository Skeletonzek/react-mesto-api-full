const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const {
  sendUsers,
  sendUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', sendUsers);
userRouter.get('/users/me', sendUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(200),
  }),
}), updateUser);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2),
  }),
}), updateAvatar);

module.exports = userRouter;
