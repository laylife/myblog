var express = require('express');
var User = require('../models/users.model.js');
var md5 = require('md5');
var router = express.Router();
/* GET home page. */
// 该路由使用的中间件

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    res.render('login', {
        title: '登录',
        login: req.session.login == '1' ? true : false,
        username: req.session.username
    });
});

router.post('/doLogin', function(req, res) {

    var username = req.body.username;
    User.findOne({ 'username': username }, function(err, data) {
        console.log(data);
        var password = req.body.password;
        var jiamihou = md5(md5(password) + '你好')
        if (err) {
            res.send('-3');
            return;
        }
        //判断密码是否正确
        if (jiamihou != data.password) {
            console.log('你输入的密码不正确!');
            res.send('-2');
            return;
        }
        if (data = null) {
            res.send('-1'); //用户名不存在
            return;
        }

        req.session.login = "1";
        req.session.username = username;
        res.send('1');
        console.log('登录成功!');
    });

});
//设置退出业务
router.get('/logout', function(req, res) {
    req.session.login = null;
    res.redirect('/');
});
module.exports = router;