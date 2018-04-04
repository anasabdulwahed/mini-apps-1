var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var csvUtils = require('./csv-utils');

var port = 3000;

var app = express();

app.use(bodyParser.json());

app.get('/csv', function(req, res) {
  var fileParam = req.url.split('?')[1];
  if (!fileParam) {
    res.statusCode = 404;
    res.end('Cannot find this file');
    return;
  }
  var fileName = fileParam.split('=')[1];
  var result = csvUtils.read(fileName, function(err, result) {
    debugger;
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
});

app.post('/csv', function(req, res) {
  debugger;
  var { json, filename } = req.body;
  csvUtils.write(filename, json, function(err, result) {
    if (err) {
      res.statusCode = 400;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 201;
    res.end(result.toString());
  });
});

app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, function() {
  console.log('Listening on port ' + port);
});

