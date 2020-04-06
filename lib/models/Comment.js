const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

commentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

commentSchema.statics.mostComments = function() {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'comments', 
          'localField': '_id', 
          'foreignField': 'post', 
          'as': 'comments'
        }
      }, {
        '$project': {
          '_id': true, 
          'user': true, 
          'photoUrl': true, 
          'caption': true, 
          'numComments': {
            '$size': '$comments'
          }
        }
      }, {
        '$sort': {
          'numComments': -1
        }
      }, {
        '$limit': 10
      }
    ]);
};



module.exports = mongoose.model('Comment', commentSchema);
