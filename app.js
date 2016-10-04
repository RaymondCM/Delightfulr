var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(compression())

app.use(express.static(__dirname + '/public', {
    maxAge: 86400000
}));

require('./routes')(app);

var server = http.createServer(app).listen(8080);