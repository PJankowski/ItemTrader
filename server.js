var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');

var app = express();

if(app.get('env') == 'development') {
    mongoose.connect('mongodb://localhost/ItemTrader', function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('DB Connected!');
        }
    });
}else if(app.get('env') == 'production'){
    mongoose.connect('mongodb://PJankowski25:Payton15@linus.mongohq.com:10035/app31049774');
}

/*var UserSchema = mongoose.Schema({
    first: String,
    last: String,
    email: String,
    username: String,
    password: String
});

var User = mongoose.model('User', UserSchema);*/

app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', function(req, res){
    User.findOne(req.body, function(err, user){
        if(err){
            res.status(500).send(err);
        }else if(user == null){
            res.status(500).send('That user does not exist!');
        }else{
            res.status(200).send(user);
        }
    });
});

app.post('/api/user', function(req, res){
    var user = new User(req.body);
    user.save(function(err, newuser){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(newuser);
        }
    });
});

app.get('/api/user/profile/:id',function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(user);
        }

    });
});

app.listen(app.get('port'), function(){
    console.log('Magic happening on port: ' + app.get('port'));
});
