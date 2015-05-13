// Load dependencies
var http = require("http");
// var https = require('https');
var fs = require('fs');

var express = require('express');
var app = express();

var router = express.Router();
var port = process.env.PORT || 8000;

var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var csrf = require('csurf');

// HTTPS
// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

// Database configuration
var configDB = require('./middlewares/database.js');

// Configure app
mongoose.connect(configDB.url); // connect to our database
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

require('./middlewares/passport')(passport);

// Middleware
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
// app.use(csrf());


// Passport info
app.use(session({secret: 'fentonsfartssmellawful'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', router);
require('./controllers/routes.js')(app, passport);


// Start the server
// https.createServer(options, function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
// }).listen(port);
app.listen(port);
console.log("Server running on: " + port)
console.log(path.join(__dirname, 'public'));
