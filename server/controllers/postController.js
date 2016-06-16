var BlogPost = require('../models/blogModel');

function create(req, res) {
  BlogPost.create(req.body, function (err, post){
    if (err) return console.error(err);
    res.json(post);
  });
}

function findAll(req, res) {
  BlogPost.find({},function(err, posts) {
    if (err) return console.error(err);
    res.json(posts);
  });
}

function findSlug(req, res) {
  BlogPost.find({
      slug: req.params.slug
    }, function(err, post) {
      if(err)
      res.send(err);
      res.writeHead(200, {'Content-Type': 'text/JSON'});
      res.end(JSON.stringify(post))
    });
}

function createBySlug(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var author = req.body.author;
  var slug = req.params.slug;
  var hidden = req.body.hidden;
  BlogPost.create({title: title, body:body, author:author, hidden:hidden, slug: slug}, function (err, post){
    if (err) return console.error(err);
    res.json(post);
  });
}

function updatePost(req, res) {
  BlogPost.update({slug: req.params.slug}, function(err, post){
    if(err)
      res.send(err);
      res.json(post);
  });
}

// function deletePost(req, res) {
//   var slug = req.params.slug;
//   BlogPost.remove
// }

module.exports = { create, findAll, findSlug, createBySlug, updatePost };
