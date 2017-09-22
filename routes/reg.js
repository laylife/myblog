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
    res.render('reg', {
        title: '注册',
        login: req.session.login == '1' ? true : false,
        username: req.session.username
    });
});
router.post('/doReg', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var jiamiPassword = md5(md5(password) + '你好')
    console.log(username);
    var user = new User({
        username: username,
        password: jiamiPassword,
        email: req.body.email
    });
    User.findOne({ 'username': user.username }, function(err, data) {
        if (err) {
            res.send('-3');
            return;
        }
        if (data != null) {
            console.log('用户已存在!');
            res.send('-1');
            return;
        }
        user.save(function(err, data) {
            if (err) {
                res.send('-3');
                return;
            }
            req.session.login = '1';
            console.log('注册成功');
            req.session.username = username;
            res.send('1');

        });
    });
});
module.exports = router;