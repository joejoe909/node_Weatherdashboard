const http = require('http');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3002;

//Setup Handlebars
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//Handle bar testing
// const HBtestString = "this is my initial test string for handlebar testing";
// const cityNames = [ 'New York', 'Paris', 'Los Angeles', 'San Francisco', 'Seattle', 'Portland', 'Chicago', 'Dallas', 'Mami', 'Phoenix', 'Tucson', 'Nogales' ]

// const test = ['test', 'test2', 'test3']

//Require our routes.
require('./routes/api-routes')(app);
//Setup starter data.
// app.get('/', (req, res)=>{
//     res.render('home', {
//         hbout1: HBtestString,
//         city: cityNames,
//     });
// })


const server = http.createServer(app);
server.listen(PORT);

app.use(express.static(path.join(__dirname, 'public')));
console.debug('Server listening on port ' + PORT);

