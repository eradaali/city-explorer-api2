'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


// const weather =require('./assets/weather.json')
const server = express();
const PORT = process.env.PORT;
// server.use(cors());



server.listen(PORT, () => {
    console.log(`i am listing ${PORT}`)
});

let newArray = [];


// class serverApi {
//     constructor (descriptinWather,data){
// this.descriptinWather=descriptinWather
// this.data=data
// newArray.push(this);
//     }
// }

class access {
    constructor(value) {
        this.descriptinWather = value.weather.descriptinWather
        this.data = value.data
        newArray.push(this);
    }
}

class Movies {
    constructor(value) {

        this.title = value.title;
        this.overview = value.overview;
        this.average_votes = value.vote_average;
        this.image_url = `https://image.tmdb.org/t/p/w500/${value.poster_path}`;
        this.total_votes = value.vote_count;
        this.popularity = value.popularity;
        this.released_on = value.release_date;

    }
}

//http:localhost:3002/weather?cityName=Amman&lon=35.91&lat=31.95
// server.get('/weather',(req,res)=>{
//     console.log(req.query)
//     let cityname=req.query.cityname
//     let seclect=weather.find((value) =>
//     {
//         if (value.cityname === cityname){
//             return value
//         }
//     })
//     for(let x=0;x<seclect.data.length;x++){
//         new serverApi (seclect.data[x].weather.description,seclect.data[x].valid_date)
//     }
//     res.send(newArray);
// }) //weeen sel server asdk api yes
let dataArray = [];
server.get('/weather', getDataWeather);
function getDataWeather(req, res) {
    let searchQ = req.query.cityName;

    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQ}&key=${process.env.WEATHER_API_KEY}`
    axios.get(weatherUrl).then(weatherData => {
        dataArray = weatherData.data.data.map(w => {
            return new access(w);
        })
        res.header("Access-Control-Allow-Origin", "*"); //re run ??? re run
        res.send(dataArray)
    })
    //ok s7 no 3'alat 7t value bdl w //rerun runnn run mshan allah run
}

let selectMovieArray = [];


server.get('/movies', funMoive);
function funMoive(req, res) {
    let result = req.query.cityName;
    // console.log(result);
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${result}`


    axios.get(movieUrl).then(movieData => {
        selectMovieArray = movieData.data.results.map(w => {
            console.log("poster_path", w.poster_path);
            return new Movies(w);

        })

        res.send(selectMovieArray);

    })
        .catch(error => {
            res.status(401).send(error, 'error to git movies')
        })
}


server.get('*', (req, res) => {
    res.status(404).send('Ops ... the city is  not found')
})