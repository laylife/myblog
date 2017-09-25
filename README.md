Node+Express
============
使用node+express+mongoose搭建个人博客
-----------------------------------
特点：简单而且容易上手，特别适合新手练习的项目
开发环境:
------------
* Node.js:6.10.3
* Mongoose:4.11.12
* Express:4.15.2


[源码](https://github.com/liuoulin/myblog)
====

项目预览
-------

![](https://github.com/liuoulin/myblog/blob/master/img/index.png?raw=true)


复制项目
-------
	# 将项目克隆到本地
	    git clone https://github.com/liuoulin/myblog.git
	# 安装项目依赖
	    cnpm install
	# 在D(或者其他盘符)盘下创建mongo文件夹，然后打开数据库
		mongod --dbpath /d/mongo/
	# 启动项目
	    cnpm start

项目目录:
--------

* bin/

	+ www ------------项目入口文件
	
* node_modules/ --------项目依赖文件夹，cnpm install后生成

* public/

	+ javasxripts/ -----js文件
	+ stylesheets/ -----css样式文件
	+ images/ ------图片文件

* routes/ ------路由配置文件
	+ detail.js ---详情页
	+ delete.js ---删除也
	+ index.js ---首页
	+ login.js ---登录页
	+ reg.js ---注册页
	+ post.js ---发表文章页
	+ edit.js ---编辑页
	
* views/ -----视图文件夹
	+ detail.ejs ---详情页
	+ delete.ejs ---删除也
	+ index.ejs ---首页
	+ login.ejs ---登录页
	+ reg.ejs ---注册页
	+ post.ejs ---发表文章页
	+ edit.ejs ---编辑页
	+ error.ejs ---错误页
	+ header.ejs ---头部
	+ footer.ejs ---脚部

* app.js --------------------存放的Express项目中最基本的配置信息

* package.json --------------------项目依赖文件

文件解析
-------
####app.js

	//引入资源
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
	
	// 视图引擎设置
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
	
	// 404页面处理
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

思路大概这样，可下载源码运行，供大家一起学习，一起进步！！！

		