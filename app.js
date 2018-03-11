const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

//Schema mongo
var Student = require('./models/student')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

//mongodb connection
mongoose.connect('mongodb://localhost:27017/adsd2018');
var db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error'));

//route route
app.get('/', function(req, res) {
    const email = req.cookies.studentemail;
    if(email) res.render('index', {email: email}); else {
        res.redirect('/registration');
    }
});

app.get('/registration', function(req, res) {
    res.render('registration');
});

app.post('/registration', function(req, res) {
    res.cookie('studentemail', req.body.studentemail);
    if(req.body.studentemail) {
        //Object from form
        var studentData = {
            email: req.body.studentemail
        };
        //Schema use to insert into mongo
        Student.create(studentData,function(error, use){
            if(error) {
                return next(error);
            }
        });
    }
    return res.redirect('/');
});

app.post('/goodbye', function(req, res){
    res.clearCookie('studentemail');
    return res.redirect('/registration');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function() {
    console.log('The application started!');
});