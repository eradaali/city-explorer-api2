'use strict'
const { default: axios } = require('axios');
let inMemory = {};

const yeldHandler = (request, response) => {
    let sQuery_1 = request.query.cityName;
    let sQuery_2 = request.query.term;
    const ENDPOINT = '/businesses/search'
    let yeldUrl = `https://api.yelp.com/v3/businesses/search?location=${sQuery_1}&term=${sQuery_2}`;
    let headers = { 'Authorization': `Bearer ${process.env.Yelp_API_Key}` }
    let yelpREST = axios.create({
        baseURL: `https://api.yelp.com/v3/businesses/search?location=${sQuery_1}&term=${sQuery_2}`,
        headers: {
            Authorization: `Bearer ${process.env.Yelp_API_Key}`,
            "Content-type": "application/json",
        },
    })
    yelpREST(ENDPOINT, { params: { key: ENDPOINT } }).then(({ data }) => {
        let yeldObj = data.businesses.map(service => {
            return (new Yeld(service))
        })
        response.status(200).send(yeldObj)
    }).catch(error =>{
        response.send(error)
    })
 
}
class Yeld {
    constructor(service) {
        this.name = service.name;
        this.image_url = service.image_url;
        this.url = service.url;
        this.rating = service.rating;
        this.price = service.price;
    }
}
module.exports = yeldHandler;