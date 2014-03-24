var jquery = require("jquery");
var http = require("http");
var connect = require('connect');
connect.createServer(
    connect.static(__dirname + '/public')
).listen(8080);