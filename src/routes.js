const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        phone: Joi.string().required().trim(),
        location: Joi.string().empty('').default('unknown').trim(),
    }),
}), UserController.create);

routes.put('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().trim(),
        email: Joi.string().email().trim(),
        phone: Joi.string().trim(),
        location: Joi.string().empty('').default('unknown').trim(),
    }),
}), UserController.update);

routes.delete('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), UserController.delete);

module.exports = routes;
