var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var User = require('./models/User');
var Item = require('./models/Item');

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
    mongoose.connect('mongodb://PJankowski25:Payton15@linus.mongohq.com:10020/ItemTrader');
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
app.use(session({secret: 'This is a secret'}));
app.use(express.static(path.join(__dirname, 'public')));



app.post('/api/login', function(req, res){
    User.findOne(req.body, function(err, user){
        if(err){
            res.status(500).send(err);
        }else if(user == null){
            res.status(500).send(err);
        }else{
            req.session.user = user;
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
            req.session.user = user;
            res.status(200).send(newuser);
        }
    });
});

app.post('/api/items', function(req, res){
    var item = new Item(req.body);
    item.save(function(err, newItem){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(newItem);
        }
    })
});

app.get('/api/logout', function(req, res){
    req.session.user = null;
    res.status(200);
});

app.get('/api/user/profile/:id',function(req, res){
    if(!req.session.user){
        res.status(500).send({reason: 'Please log in first!'});
    }else {
        console.log(req.session.user);
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }

        });
    }
});

app.get('/api/users/items/:id', function(req, res){
    if(!req.session.user){
        res.status(500).send({reason: 'Please log in first!'});
    }else {
        Item.find({owner: req.params.id}, function (err, items) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(items);
            }
        });
    }
});

app.get('/api/items', function(req, res){
    Item.find({}, function(err, items){
        if(err){
            res.status(500).send(items);
        }else{
            res.status(200).send(items);
        }
    })
});

app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});

app.listen(app.get('port'), function(){
    console.log('Magic happening on port: ' + app.get('port'));
});
