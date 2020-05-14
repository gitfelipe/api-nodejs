const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.send({ Message: 'Hello, routes!' })
});

module.exports = routes;
