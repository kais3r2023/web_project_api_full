const express = require("express");
const {
  getAllUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getUserProfile,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");
const {validateURL} = require("../middleware/validator")


const router = express.Router();




router.get("/", getAllUsers);
router.get("/me", getUserProfile);
router.get("/:id", getUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  })
}), updateAvatar);

module.exports = router;
