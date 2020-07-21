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
        commentBy: user._id,
        post: post._id
      })  
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          post: post._id,
          comment: 'Sweet Post!',
          commentBy: user._id,
          __v: 0
        });
      });
  });

  it('deletes a comment by id and returns result', async() => {
    const user = await getUser({ username: 'joshford' });
    const comment = await getComment();
    return getAgent()
      .delete(`/api/v1/comment/${comment._id}`)  
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: comment._id,
          post: comment.post,
          comment: comment.comment,
          commentBy: comment.commentBy,
          __v: 0
        });
      });
  });
});
