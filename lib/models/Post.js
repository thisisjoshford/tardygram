const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  user: {
    ref: 'user',
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  tags: [String]
});

module.exports = mongoose.model('Post', postSchema);
