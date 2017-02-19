var express = require('express');
var logger = require('morgan');
var bodyparser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));

require('./routes')(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});