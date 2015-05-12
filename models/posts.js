var mongoose = require('mongoose');

// Generate schema for post model
var postSchema = mongoose.Schema ({
  post_id: Number,
  post_title: String,
  post_body: String,
  post_preview: String,
  post_url_slug: String,
  post_author: String,
  post_publish_date: { type: Date, default: Date.now },
  post_updated: { type: Date, default: Date.now },
  post_is_published: Boolean,
  post_meta: {
    votes: Number,
    fb_shares: Number,
    tweets: Number
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Post', postSchema);
