const mongoose = require('mongoose');
const { hashSync, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (dov, ret) => {
      delete ret.passwordHash;
    }
  }
});

// virtuals are used so we dont save a plain text pw in database
userSchema.virtual('password').set(function(password){
  // has the password w/ bcrypt and then set this.passwordHash to the newly hashed pw
//process env added for local development (shorter number of salt rounds)
  const hash = hashSync(password, Number(process.env.SALT_ROUNDS || 14));
  this.passwordHash = hash;
});

//statics are used when something needs to be done BEFORE a user exists
//methods work on things that already exist

// for login
userSchema.statics.authorize = async function({ username, password }) {
  // check that a user exists w/ username and that the password matches... if both conditions are true return user otherwise error
  const user = await this.findOne({ username });

  if(!user){
    const error = new Error('Invalid username or password');
    error.status = 403;
    throw error;
  }

  const matchingPasswords = await compare(password, user.passwordHash);
  if(!matchingPasswords){
    const error = new Error('Invalid username or password');
    error.status = 403;
    throw error;
  }
  return user;
};

//convert to and from mongoose doc so you can get static methods
//mongoose document --> pojo(.toJSON())
// pojo --> mongoose doc (hydrate)


// ensure auth middleware
//take a token and get a user
userSchema.statics.findByToken = function(token) {
  // take a token and return a user who owns said token
  try {
    const { payload } = verify(token, process.env.APP_SECRET);
    //return a user who owns the token
    //hydrate creates a mongoose doc
    return Promise.resolve(this.hydrate(payload));
  } catch(e) {
    Promise.reject(e);
  }
};
// for sign up and login
userSchema.methods.authToken = function(){
  // user JWT to create a token for user and return it
  //moved this.toJSON() from the payload: value so we can remove the pw hash
  // const jsonCreatedUser = this.toJSON();
  // delete jsonCreatedUser.passwordHash;
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET);
  return token;
};

module.exports = mongoose.model ('User', userSchema);
