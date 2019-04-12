const Post = require('../models/post')
const path = require('path');
const cloudinary = require('cloudinary');

module.exports = async(req, res)=>{
    const { image } = await req.files;
    const uploadPath = path.resolve(__dirname, '..', "public/posts", image.name)
  image.mv(uploadPath, error => {
    
    cloudinary.v2.uploader.upload(uploadPath, (error, result)=>{
      if(error) {return res.redirect('/')};

      let newPost = new Post({ ...req.body, image: result.secure_url, author: req.session.userId });
      const post = newPost.save();
      res.redirect("/");
    })
  });
}