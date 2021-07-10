'use strict'
const { default: axios } = require('axios');

let inMemory = {};
const yelpHandler = (request, response) => {

    let sQuery_1 = request.query.cityName;
    let sQuery_2 = request.query.term;
    const ENDPOINT = '/businesses/search'

    if (inMemory[sQuery_1] !== undefined) {
        console.log('We already have the data');
        response.status(200).send(inMemory[sQuery_1]);
    } else {

        let yelpREST = axios.create({
            baseURL: `https://api.yelp.com/v3/businesses/search?location=${sQuery_1}&term=${sQuery_2}`,
            headers: {
                Authorization: `Bearer ${process.env.Yelp_API_Key}`,
                "Content-type": "application/json",
            },
        })

        yelpREST(ENDPOINT, { params: { key: ENDPOINT } }).then(({ data }) => {

            let yelpObj = data.businesses.map(service => {
                return (new Yelp(service))

            })
            inMemory[sQuery_1] = yelpObj;
            response.status(200).send(yelpObj)
        }).catch(error => {
            response.send(error)
        })

    }


}

class Yelp {
    constructor(service) {
        this.name = service.name;
        this.image_url = service.image_url;
        this.url = service.url;
        this.rating = service.rating;
        this.price = service.price;
    }
}

module.exports = yelpHandler;