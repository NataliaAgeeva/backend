const validator = require('validator');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json({ data: cards }))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).json({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  if (validator.isMongoId(req.params.cardId)) {
    Card.findByIdAndDelete(req.params.cardId)
      .orFail(() => new Error('Запрашиваемая карточка отсутствует'))
      .then((card) => {
        res.status(200).json({ data: card });
      })
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'Ошибка пользовательского ввода id карточки' });
  }
};

module.exports.likeCard = (req, res) => {
  if (validator.isMongoId(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new Error('Запрашиваемая карточка отсутствует'))
      .then((card) => res.status(200).json({ data: card }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'Ошибка пользовательского ввода id карточки' });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (validator.isMongoId(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new Error('Запрашиваемая карточка отсутствует'))
      .then((card) => res.status(200).json({ data: card }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'Ошибка пользовательского ввода id карточки' });
  }
};
