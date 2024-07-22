const express = require('express');
const {getAllCards, createCard, deleteCard, likeCard, dislikeCard}= require ('../controllers/cards')
const {celebrate, Joi}= require("celebrate")
const {jwtMiddleware} = require("../middleware/auth")
const {validateURL}= require("../middleware/validator")

const router = express.Router();

router.use(jwtMiddleware);

router.get('/',getAllCards);
router.post('/',  celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}),createCard);
router.delete('/:id',deleteCard);
router.put('/likes/:id', likeCard);
router.delete('/likes/:id', dislikeCard);

module.exports = router;
