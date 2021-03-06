const Card = require('../models/Card');

// errors
const NotFoundError = require('../config/errors/NotFoundError');
const RequestError = require('../config/errors/RequestError');
const PermissionError = require('../config/errors/PermissionError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Cards unavailable');
      }
      res.status(200).send(cards);
    })
    .catch((err) => next(new RequestError(`Could not get cards: ${err.message}`)));
};

module.exports.createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => next(new RequestError(`Could not create card: ${err.message}`)));
};

module.exports.deleteCard = (req, res, next) => {
  Card.doesUserOwnCard(req.params.cardId, req.user._id)
    .then((card) => {
      Card.findByIdAndRemove(card._id)
        .then((deletedCard) => {
          res.status(200).send({ deletedCard });
        })
        .catch(() => next(new NotFoundError('Card unavailable')));
    })
    .catch(() => next(new PermissionError('User does not own card')));
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card unavailable');
      }
      res.status(200).send({ card });
    })
    .catch(() => next(new NotFoundError('Card unavailable')));
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card unavailable');
      }
      res.status(200).send({ card });
    })
    .catch(() => next(new NotFoundError('Card unavailable')));
};
