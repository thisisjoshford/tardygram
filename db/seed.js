const User = require('../lib/models/User');
const Post = require('../lib/models/Post'); 
const Comment = require('../lib/models/Comment'); 
const chance = require('chance').Chance();


module.exports = async({ usersToCreate = 10, postsToCreate = 10, commentsToCreate = 20 } = {}) => {
  await User.create({
    username: 'joshford',
    password: 'password'
  });

  const user = await User.create([...Array(usersToCreate)]
    .slice(1)
    .map(() => ({
      username: chance.name(),
      passwordHash: chance.hash(),
      profilePhotoUrl: 'http://www.placekitten.com/200/200'
    })));

  const post = await Post.create([...Array(postsToCreate)]
    .map(() => ({
      user: chance.pickone(user),
      photoUrl: 'http://www.placekitten.com/200/200',
      caption: chance.sentence(),
      tags: chance.hashtag()
    })));

  const comment = await Comment.create([...Array(postsToCreate)]
    .map(() => ({
      commentBy:chance.pickone(user),
      post: chance.pickone(post),
      comment: `Sweet ${chance.animal()}`
    })));

};
