var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport')
var secrets = require('./config/secrets');
var webpack = require('webpack');
var app = express();

mongoose.connect('mongodb://localhost/blogPosts');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

// Bootstrap models
  fs.readdirSync(__dirname + '/models').forEach(function(file) {
    if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
  });

  var isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    var config = require('../webpack/webpack.config.dev-client.js');
    var compiler = webpack(config);
    
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
    require('./config/passport')(passport);
    app.use(require('webpack-hot-middleware')(compiler));
  }


  // Bootstrap application settings
  require('./config/express')(app, passport);

  // Bootstrap routes
  require('./config/routes')(app, passport);

  app.listen(app.get('port'));
})

