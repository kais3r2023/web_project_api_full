const bcrypt = require('bcrypt');
const User = require("../models/user");
const {InvalidError, NotAuthorization, ServerError, NotFoundError} = require("../middleware/errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {NODE_ENV, JWT_SECRET} = process.env;


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

module.exports.getAllUsers = (req, res, next) => {
  const userId = req.user._id;
  if (!userId) {
    throw new Error(
      "No tienes autorización para acceder a esta contenido"
    );
  }
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
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

    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getUserProfile = (req, res)=>{
  const{ user } = req;
  res.json({user});
}