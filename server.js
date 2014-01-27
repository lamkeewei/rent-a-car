
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var cors = require('cors');
// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(cors());
// var sys = require('sys');
// var exec = require('child_process').exec;

// app.get('/ogr', function(req, res){
//   exec('ogr2ogr', function(error, stdout, stderr){
//     console.log(stdout);
//     res.send('hello');
//   });
// });

app.post('/upload', function(req, res){
  fs.readFile(req.files.image.path, function(err, data){
    var imageName = req.files.image.name;

    if (!imageName){
      console.log('error has occurred');
      res.redirect('/');
      res.end();
    } else {
      var newPath = __dirname + '/uploads/' + imageName;

      fs.writeFile(newPath, data, function(err){
        res.send('done');
      });
    }
    res.send('done');
  });
});

app.listen(app.get('port'));