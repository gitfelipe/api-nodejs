const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send({ Message: 'Hello, server!' })
});

app.listen(3333);
