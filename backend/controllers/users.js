const bcrypt = require("bcrypt");
const User = require("../models/user");
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res) => {
  User.find()
    .orFail()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(SERVER_ERROR_CODE).json({ message: error.message });
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      res.status(NOT_FOUND_CODE).json({ message: error.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error(" El email ya se encuentra registrado"); // correccion del email y el password en createUser
      } else {
        return bcrypt.hash(req.body.password, 10);
      }
    })

    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash });
    })

    .then((user) => {
      res.send({ data: user });
    })

    .catch((error) => {
      res.status(ERROR_CODE).json({ message: error.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      res.status(NOT_FOUND_CODE).json({ message: error.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      res.status(NOT_FOUND_CODE).json({ message: error.message });
    });
};
