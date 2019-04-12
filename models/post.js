const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
      type: Date,
      default: new Date()
    },
    image: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;