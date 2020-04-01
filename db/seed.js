const User = require('../lib/models/User');
const chance = require('chance').Chance();


module.exports = async({ usersToCreate = 10 } = {}) => {

  const user = await User.create([...Array(usersToCreate)].map(() => ({
    username: chance.name(),
    passwordHash: chance.hash(),
    profilePhotoUrl: 'http://www.placekitten.com/200/200'
  })));
};
