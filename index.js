const http = require('http');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
})

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3002;

//Setup Handlebars
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

require('./routes/api-routes')(app);

const server = http.createServer(app);
server.listen(PORT);

app.use(express.static(path.join(__dirname, 'public')));
console.debug('Server listening on port ' + PORT);

