var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const port = 3000;

var app = express();

app.use(bodyParser.json());

app.get('/game', function(req, res) {


});

app.post('/game', function(req, res) {

});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});