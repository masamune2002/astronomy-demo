var jquery = require("jquery");
var http = require("http");
var connect = require('connect');
connect.createServer(
    connect.static(__dirname + "/app/")
).listen(8080);