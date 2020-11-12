const http = require('http');
const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3002;

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//call the openweather api using a user provided city name - ToDo: nest this function.
// axios({
//     method: 'get',
//     url: 'https://api.openweathermap.org/data/2.5/forecast?q=tucson&appid=' + process.env.OWK,
//     responeType:'json'
//     //`responseType` indicates the type of data that the server will respond with
//     // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
//     // browser only: 'blob'
// }).then((response)=>{
//     console.log(response);
// })
//Handle bar testing
const HBtestString = "this is my initial test string for handlebar testing";
const cityNames = [ 'New York', 'Paris', 'Los Angeles', 'Seattle', 'Portland', 'Chicago', 'Dallas', 'Mami', 'Dahli']


app.get('/', (req, res)=>{
    res.render('home', {
        hbout1: HBtestString,
        city: cityNames
    });
})


const server = http.createServer(app);
server.listen(PORT);

app.use(express.static(path.join(__dirname, 'public')));
console.debug('Server listening on port ' + PORT);

