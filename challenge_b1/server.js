var express = require('express');
var path = require('path');

const port = process.env.PORT || 8080;

var app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})