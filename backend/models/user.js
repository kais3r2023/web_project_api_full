const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Explorador",
    },
    avatar: {
      type: String,
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
        message: (props) =>
          `${props.value} no es un enlace URL válido para avatar.`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: (props) => {
          return `${props.value} no es un email válido.`;
        },
      },
    },
    password: {
      type: String,
      required: true,
      select: false, // Select: false sirve para evitar que se muestre
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Error("El usuario o contraseña son incorrectos")
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Error("El usuario o contraseña son incorrectos")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);