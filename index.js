const http = require('http');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3002;

app.get('/api/test', (req, res) => {
    return res.send(process.env.HERE_API_KEY);
})

// default URL for website
app.use('/test', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/test.html'));
    //__dirname : will resolve to your project folder.
});


// default URL for website
app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/indx.html'));
    //__dirname : will resolve to your project folder.
});


const server = http.createServer(app);
server.listen(PORT);

console.debug("key is:" + process.env.HERE_API_KEY);
console.debug('Server listening on port ' + PORT);