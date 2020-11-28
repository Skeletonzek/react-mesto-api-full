const Card = require('../models/card');

module.exports.sendCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('Карточки не найдены');
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.kind === undefined) {
        next(err);
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      const error = new Error('Переданы некорректные данные');
      error.statusCode = 400;
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ data: card }));
      } else {
        const error = new Error('Ошибка доступа');
        error.statusCode = 403;
        error.kind = 'invalid';
        throw error;
      }
    })
    .catch((err) => {
      if (err.kind === undefined) {
        next(err);
      }
      if (err.kind === 'ObjectId') {
        const error = new Error('Неверный Id');
        error.statusCode = 400;
        next(error);
      }
      if (err.kind === 'invalid') {
        next(err);
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.kind === undefined) {
        next(err);
      }
      if (err.kind === 'ObjectId') {
        const error = new Error('Неверный Id');
        error.statusCode = 400;
        next(error);
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.kind === undefined) {
        next(err);
      }
      if (err.kind === 'ObjectId') {
        const error = new Error('Неверный Id');
        error.statusCode = 400;
        next(error);
      }
      next(err);
    });
};
