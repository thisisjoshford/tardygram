require('dotenv').config();
const User = require('../lib/models/User');


describe('User Model', () => {

  it('hashes password', () => {
    const user = new User({
      username: 'joshford',
      password: 'superSecretPassword'
    });

    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });

  it('creates a JWT', () => {
    const user = new User({
      username: 'joshford',
      password: 'superSecurePassword'
    });

    const token = user.authToken();
    expect(token).not.toBeUndefined();
  });

  it('finds a user by token', () => {
    const user = new User({
      username: 'joshford',
      password: 'superSecretPassword'
    });
    
    const token = user.authToken();

    User
      .findByToken(token)
      .then(foundUser => {
        expect(foundUser.toJSON()).toEqual(user.toJSON());
      });
  });
});

