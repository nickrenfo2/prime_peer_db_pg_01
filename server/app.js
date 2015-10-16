var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var session = require('express-session');
var path = require('path');

var bodyParser = require('body-parser');

var api = require('./routes/api');
var index = require('./routes/index');
var users = require('./routes/users');
//var login = require('./routes/login');
var register = require('./routes/register');

var mongoURI = "mongodb://localhost:27017/todoapp";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('Mongodb connection error:', err);
});

MongoDB.once('open', function(){
    console.log('Mongodb connection open!');
});

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({passReqToCallback: true, usernameField: 'username'},
    function(req, username, password, done){
        User.findOne({username:username}, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Incorrect username or password'});
            }
            user.comparePassword(password, function(err, isMatch) {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    done(null, false, {message: 'Incorrect username or password'});
                }
            })
        });
    }
));

passport.serializeUser(function(user, callback){
    callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
    User.findById(id, function(err, user){
        if(err) callback(err);
        callback(null, user)
    });
});

app.get('/tasks', function(req, res, next){
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, '../server/public/', file));
});

app.use('/api', api);
app.use('/', index);
app.use('/users', users);
app.use('/register', register);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
