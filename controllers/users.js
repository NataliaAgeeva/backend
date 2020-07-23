const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const opts = {
  runValidators: true,
  new: true,
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json({ data: users }))
    .catch(() => res.status(500).json({ message: 'Server error' }));
};

module.exports.getOneUser = (req, res) => {
  if (validator.isMongoId(req.params.id)) {
    User.findById(req.params.id)
      .orFail(() => new Error('User not found'))
      .then((user) => res.status(200).json({ data: user }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'User input error' });
  }
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Server error' });
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
        res.status(500).json({ message: 'Server error' });
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
        res.status(500).json({ message: 'Server error' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
