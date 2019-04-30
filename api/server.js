const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('../zoos/zoos-router');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api', (req, res) => {
	res.send(`<h1>Welcome to the Zoos API</h1>`);
});

server.use('/api/zoos', zoosRouter);

module.exports = server;
