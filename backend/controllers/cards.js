const Card = require('../models/card');

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getAllCards = (req, res)=>{
  Card.find()
  .orFail()
  .then((cards)=>{
    res.send(cards);
  })
  .catch((error)=>{
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
  })
};

module.exports.createCard = (req, res)=>{
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
  .then((card)=>{
    res.send({card});
  })
  .catch((error)=>{
    res.status(ERROR_CODE).json({ message: error.message });
  })
};

module.exports.deleteCard = (req, res)=>{
  Card.findByIdAndDelete(req.params.id)
  .orFail()
  .then((card)=>{
      res.send(card)
  })
  .catch((error)=>{
    res.status(NOT_FOUND_CODE).json({message: error.message})
  })
};

module.exports.likeCard = (req, res)=>{
  const idLike = req.params.id
  Card.findByIdAndUpdate(idLike, { $addToSet: { likes: idLike } }, {new: true})
  .orFail()
  .then((like)=>{
    res.send({like});
  })
  .catch((error)=>{
    res.status(NOT_FOUND_CODE).json({message: error.message})
  })
};

module.exports.dislikeCard = (req, res)=>{
  const idLike = req.params.id
  Card.findByIdAndUpdate(idLike, { $pull: { likes: idLike } }, {new: true})
  .orFail()
  .then((like)=>{
    res.send({like});
  })
  .catch((error)=>{
    res.status(NOT_FOUND_CODE).json({message: error.message})
  })
};