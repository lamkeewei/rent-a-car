
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(express.static(path.join(__dirname, 'public')));

var sys = require('sys');
var exec = require('child_process').exec;

app.get('/ogr', function(req, res){
  exec('ogr2ogr', function(error, stdout, stderr){
    console.log(stdout);
    res.send('hello');
  });
});

app.listen(app.get('port'));