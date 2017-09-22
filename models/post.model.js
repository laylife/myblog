var mongoose = require('mongoose');
//连接本地名为test的数据库，格式
//var db = mongoose.connect("mongodb://user:pass@localhost:port/database");
var db = mongoose.connect("mongodb://127.0.0.1:27017/blog");
var postSchema = new mongoose.Schema({
    title: { type: String }, //标题
    author: { type: String }, //作者
    article: { type: String }, //文章内容
    publishTime: { type: String }, //发表时间
    postImg: { type: String }, //封面
    coments: [{
        name: { type: String },
        time: { type: String },
        content: { type: String }
    }], //评论  暂时没有做出来
    pv: { type: Number } //访问次数
});
var Post = db.model('Post', postSchema); //创建model，在内存中创建结构为userSchema的user集合

module.exports = Post;