var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var api = require('./routes/api');
var index = require('./routes/index');

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

app.use('/api', api);
app.use('/', index);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
