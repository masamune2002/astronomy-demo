var http = require("http");
var url = require('url');
var express = require('express');
var stars = require('./routes/stars');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/app/')));
//app.use(express.logger('dev'));

app.get('/stars', stars.getStars);

app.listen(8080);
console.log('Listening on port 8080...');

