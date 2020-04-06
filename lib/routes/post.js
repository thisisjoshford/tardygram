const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensure-auth');



module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    // console.log(req);
    Post
      .create({
        ...req.body,
        user: req.user._id
      })
      .then(post => {
        // console.log(post);
        res.send(post);})
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    // console.log(req);
    Post
      .findById(req.params.id)
      .populate({
        path: 'user',
        select: 'username -_id'
      })
      .then(post => res.send({
        _id: post._id,
        user: post.user.username,
        photoUrl: post.photoUrl,
        caption: post.caption,
        tags: post.tags,
        __v: post.__v
      }))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    // console.log(req);
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  });

