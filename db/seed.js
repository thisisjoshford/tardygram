const User = require('../lib/models/User');
const chance = require('chance').Chance();


module.exports = async({ usersToCreate = 10 } = {}) => {
  await User.create({
    username: 'joshford',
    password: 'password'
  });

  const user = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    passwordHash: chance.hash(),
    profilePhotoUrl: 'http://www.placekitten.com/200/200'
  })));
};
