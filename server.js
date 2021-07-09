'use strict';
const express =require('express');
require('dotenv').config();
const cors =require('cors');



const weather =require('./assets/weather.json')
const server=express();
const PORT =process.env.PORT;
server.use(cors());



server.listen(PORT,()=>{  
      console.log(`i am listing ${PORT}`)});

let newArray=[];

class serverApi {
    constructor (descriptinWather,data){
this.descriptinWather=descriptinWather
this.data=data
newArray.push(this);
    }
}


//http:localhost:3002/weather?cityName=Amman&lon=35.91&lat=31.95
server.get('/weather',(req,res)=>{
    console.log(req.query)
    let cityname=req.query.cityname
    let seclect=weather.find((value) =>
    {
        if (value.cityname === cityname){
            return value
        }
    })
    for(let x=0;x<seclect.data.length;x++){
        new serverApi (seclect.data[x].weather.description,seclect.data[x].valid_date)
    }
    res.send(newArray);
})

server.get('*',(req,res)=>{
    res.status(404).send('Ops ... the city is  not found')
})