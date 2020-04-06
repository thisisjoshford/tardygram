const { getPosts, getPost, getAgent, getUser } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('post routes', () => {
  it('posts a post', async() => {
    const user = await getUser({ username: 'joshford' });
    // console.log(user);
    return getAgent()
      .post('/api/v1/post')
      .send({
        user: user._id,
        photoUrl: 'http://www.placekitten.com/200/200',
        caption: 'If I fits... I sits...',
        tags: ['#icanhazkitten, #cutekitten']
      })  
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          photoUrl: 'http://www.placekitten.com/200/200',
          caption: 'If I fits... I sits...',
          tags: ['#icanhazkitten, #cutekitten'],
          user: user._id,
          __v: 0
        });
      });
  });

  it('gets all the posts', async() => {
    const posts = await getPosts();
    return request(app)
      .get('/api/v1/post')  
      .then(res => {
        expect(res.body)
          .toEqual([...posts]);
      });
  });

  it('gets a post by id', async() => {
    const post = await getPost();
    return request(app)
      .get(`/api/v1/post/${post._id}`)  
      .then(res => {
        expect(res.body)
          .toEqual({
            user: post.username,
            photoUrl: post.photoUrl,
            caption: post.caption,
            tags: post.tags
          });
      });
  });
});
