const { getComment, getComments, getAgent, getUser, getPost } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comment routes', () => {
  it('posts a comment', async() => {
    const user = await getUser({ username: 'joshford' });
    const post = await getPost();
    // console.log(user);
    return getAgent()
      .post('/api/v1/comment')
      .send({
        comment: 'Sweet Post!', 
        post: post._id
      })  
      .then(res => {
        expect(res.body).toEqual({
          post: post._id,
          comment: 'Sweet Post!'
        });
      });
  });
});
