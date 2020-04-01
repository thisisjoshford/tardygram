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
  });
