var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  slug: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  hidden: Boolean
});


var BlogPost = mongoose.model('post', blogSchema);

module.exports = BlogPost
