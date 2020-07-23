const validator = require('validator');
const User = require('../models/user');

const opts = {
  runValidators: true,
  new: true,
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json({ data: users }))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.getOneUser = (req, res) => {
  if (validator.isMongoId(req.params.id)) {
    User.findById(req.params.id)
      .orFail(() => new Error('Запрашиваемый пользователь отсутствует'))
      .then((user) => res.status(200).json({ data: user }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'Ошибка пользовательского ввода id пользователя' });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateMyProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateMyAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Произошла ошибка' });
      }
    });
};
