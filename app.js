var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 8080;
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

server.listen(port, function () {
    console.log('Started delightfulr on :*' + port);
});