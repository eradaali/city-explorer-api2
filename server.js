'use strict';

const { response } = require('express');
const express = require('express');
const server = express();
require('dotenv').config();
const weather = require('./assests/weather.json');
const cors = require('cors');
const { default: axios } = require('axios');
const weatherHandler = require('./modules/weather');
const moviesHandler = require('./modules/movies');
const yelpHandler = require('./modules/yeld')

server.use(cors());

const PORT = process.env.PORT;

server.get('/', (request, response) => {
    response.status(200).send('Home Route')
})


server.get('/test', (request, response) => {
    response.status(200).send('My server is working')
})


server.get('/weatherinfo', weatherHandler);

server.get('/moviesinfo', moviesHandler);

server.get('/yelp', yelpHandler);


server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})


server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})