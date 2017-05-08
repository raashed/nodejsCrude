var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var env = require('./env');
mongoose.connect('mongodb://' + env.database_host + '/' + env.database_name);
var db = mongoose.connection;

//Init app
var app = express();


//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set statuc folder
app.use(express.static(path.join(__dirname, 'public')));


//Main Routes (Separated)
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
//Global vars
app.use(function(req, res, next) {
    res.locals.base_url = req.protocol + '://' + req.get('host');
    next();
});

//Set Port
app.set('port', (process.env.PORT || 3600));

mongoose.connection.on('error', function(err) {
    console.log('Mongodb is not running.');
    process.exit();
}).on('connected', function() {
    app.listen(app.get('port'), function() {
        console.log('Server started on port: ' + app.get('port'));
    });
});

/*
app.listen(app.get('port'), function() {
    console.log('Server started on port: ' + app.get('port'));
});*/
