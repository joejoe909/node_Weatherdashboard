const axios = require('axios');
const { response } = require('express');
const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();
const chalk = require('chalk');
const app = express();

const hbs = exphbs.create({});
hbs.getPartials().then(function(partials){ console.log("list of partials: " + partials)})

app.engine('handlebars', hbs.engine);
app.set('view enginer', 'handlebars');


module.exports = (app)=>{

    const HBtestString = "";
    const cityNames = ['New York', 'Paris', 'Los Angeles', 'San Francisco', 'Seattle', 'Portland', 'Chicago', 'Dallas', 'Miami', 'Phoenix', 'Tucson', 'Nogales']


    app.get('/api/search/:city', async (req,res)=>{
        const city = req.params.city;
        if(!cityNames.includes(city))
        {
            cityNames.pop();
            cityNames.unshift(city);
        }
        console.debug(city);
        const URL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&appid=' + process.env.OWK;
        let FDF, UV;
        let LAT, LON;
        //get the Five Day Forecast (FDF)
        await Promise.all([
            axios.get(URL).then((response)=>{
                console.debug(chalk.green('Data for Five day forcast'));
                const {lat, lon} = response.data.city.coord;
                LAT = lat, LON = lon;
                FDF = response.data, null, 4;
            })
        ]);       
        
        const URLuv = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + LAT + "&lon=" + LON + '&appid=' + process.env.OWK;
        await Promise.all([ 
            axios.get(URLuv).then((response)=>{
                UV = response.data
            })
        ]);
    
        const wthr = [FDF , UV]
        console.log("did this happen?");
        res.send(wthr);
       
    })

   

    app.get('/', (req, res) => {
        res.render('home', {
            hbout1: HBtestString,
            city: cityNames,
        });
    })

 
}

