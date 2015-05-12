var mongoose = require('mongoose');

// Generate schema for post model
var authorSchema = mongoose.Schema ({
  author_id: Number,
  author_first_name: String,
  author_last_name: String,
  author_url_slug: String,
  author_articles: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Author', authorSchema);
