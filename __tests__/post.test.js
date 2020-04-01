const { getPosts, getPost, getAgent, getUser } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('post routes', () => {
  it('posts a post', async() => {
    const user = await getUser({ username: 'j0shf0rd' });
    return getAgent()
      .post('/api/v1/posts')
      .send({
        photoUrl: 'http://www.placekitten.com/200/200',
        caption: 'If I fits... I sits...',
        tags: ['test1, test2'],
        user: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          photoUrl: 'http://www.placekitten.com/200/200',
          caption: 'If I fits... I sits...',
          tags: ['#icanhazkitten, cutekitten'],
          user: expect.any(String),
          __v: 0
        });
      });
  });
});
