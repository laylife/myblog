var express = require('express');
var Post = require('../models/post.model.js');
var path = require('path');
var moment = require('moment'); //事件控件
var formidable = require('formidable'); //表单控件
var fs = require('fs');
var router = express.Router();
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    var id = req.query.id;
    Post.findById(id, function(err, data) {
        if (err) {
            return res.send('查询失败!');
        }
        res.render('edit', {
            title: '编辑',
            login: req.session.login == '1' ? true : false,
            username: req.session.username,
            post: data
        });

    });

});
router.post('/doEdit', function(req, res) {
    var imgPath = path.normalize(__dirname + "/../public/images");
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置表单的编码
    form.uploadDir = imgPath; //设置上传目录
    form.keepExtensions = true; //保留文件后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('服务器内部错误');
            res.send('-1');
            return;
        }
        console.log(fields);
        console.log(files);
        var oldPath = files.postImg.path; //获取上传文件信息
        console.log(oldPath);
        var newPath = path.normalize(__dirname + "/../public/images/") + files.postImg.name;
        console.log(newPath);
        /* if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'image/jpg') {
            console.log('上传图片格式错误，只支持png,jpeg,gif,jpg');
            res.send('-2');
            return;
        } */
        fs.rename(oldPath, newPath, function(err) {
            if (err) {
                return res.send('上传失败');
            }
            var id = fields.id;
            console.log(id);
            var title = fields.title;
            var author = req.session.username;
            console.log(author);
            var article = fields.article;
            console.log(article);
            var postImg = newPath;
            console.log(postImg);
            var pv = fields.pv;
            // 校验参数
            /* try {
                if (!title.length) {
                    throw new Error('请填写标题');
                }
                if (!article.length) {
                    throw new Error('请填写内容');
                }
                if (!postImg.length) {
                    throw new Error('请上传图片');
                }
            } catch (e) {
                return res.redirect('/');
            } */

            /* var post = new Post({
                title: title,
                author: author,
                article: article,
                postImg: postImg,
                publishTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString(),
                pv: pv
            }); */
            //这里纠结过最久，首先不想mongodb需要把自建的id用ObjectId()转化
            //可以直接通过id查询
            Post.findById(id,
                function(err, data) {
                    if (err) {
                        console.log('文章更新出现错误');
                        return res.redirect('/');
                    }
                    Post.updateMany({ _id: id }, {
                        $set: {
                            article: article,
                            postImg: postImg,
                        }
                    }, function(err) {
                        if (err) {
                            console.log('文章更新出现错误');
                            return res.redirect('/');
                        }
                        console.log('文章更新成功');
                        res.redirect('/');
                    });
                });

        });
    });

});
module.exports = router;