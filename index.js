'use strict';

var path = require('path');
var http = require('http');
var express = require('express');
var hbs = require('express-hbs');
var pkg = require('./package.json');
var app = express();
var port = process.env.PORT || 61913;

hbs.registerHelper('stringify', function (data) {
  return JSON.stringify(data, null, 2);
});

// use handlebars using .html as the extension for syntax highlighting
app.engine('html', hbs.express3({
  extname: '.html',
  defaultLayout: path.resolve(__dirname + '/views/layout.html'),
}));
app.set('views', path.resolve(__dirname + '/views'));
app.set('view engine', 'html');

app.all('/foo', function(req, res) {
  res.send({ value: 'bar' });
});

app.all('/', function(req, res) {
  res.render('hello');
});

app.all('/echo/:echo', function(req, res) {
  res.render('echo', {
    echo: req.params.echo
  });
});

var server = http.createServer(app).listen(port, function () {
  console.log(pkg.name + ' v' + pkg.version + ' is up and running on port http://localhost:' + server.address().port);
});