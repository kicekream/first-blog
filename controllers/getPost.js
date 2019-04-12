const Post = require('../models/post');

module.exports =  async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author');
  
    res.render("post", {
      post
    });
  }