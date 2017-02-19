var express = require('express');
var logger = require('morgan');
var app = express();
require('./routes')(app);

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});