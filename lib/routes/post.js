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
      //broke it down to change user object to just the username... 
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

  .get('/popular', (req, res, next) => {
    Post
      .mostComments()
      .then(posts => {
        console.log(posts);
        res.send(posts)})
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    // console.log(req);
    Post
      .findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
      )
      //broke it down to change user object to just the username... 
      .then(post => res.send({
        _id: post._id,
        user: post.user,
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
  })

  .delete('/:id', (req, res, next) => {
    Post
      .findByIdAndDelete(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });

