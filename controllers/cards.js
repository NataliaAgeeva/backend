const validator = require('validator');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json({ data: cards }))
    .catch(() => res.status(500).json({ message: 'Server error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).json({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  if (validator.isMongoId(req.params.cardId)) {
    Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
      .orFail(() => new Error('Card not found'))
      .then(() => {
        res.status(200).json({ message: 'Card has been deleted' });
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: 'User input error' });
  }
};

module.exports.likeCard = (req, res) => {
  if (validator.isMongoId(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new Error('Card not found'))
      .then((card) => res.status(200).json({ data: card }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'User input error' });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (validator.isMongoId(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new Error('Card not found'))
      .then((card) => res.status(200).json({ data: card }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'User input error' });
  }
};
