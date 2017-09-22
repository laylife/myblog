var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var del = require('./routes/delete.js'); //不能使用delete作为变量，因为属于关键字，会出现expression expected
var index = require('./routes/index.js');
var login = require('./routes/login.js');
var reg = require('./routes/reg.js');
var post = require('./routes/post.js');
var detail = require('./routes/detail.js');
var edit = require('./routes/edit.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.set('trust proxy', 1) // trust first proxy 
//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use('/', index); //首页
app.use('/login', login); //登录页
app.use('/reg', reg); //注册页
app.use('/post', post); //发表文章页
app.use('/detail', detail); //详情页
app.use('/edit', edit); //编辑页
app.use('/delete', del); //删除页

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;