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
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/https?:\/\/(w{3}\.)?(\w+[\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*)+#?$/).required(),
  }),
}), updateAvatar);

module.exports = userRouter;
