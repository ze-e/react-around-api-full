const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'email is required',
    unique: true,
    validate: {
      validator(arr) {
          return validator.isEmail(arr);
      },
     message: 'please enter a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default:'Explorer',
  },
  avatar: {
    type: String,
    default:'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator(str) {
          const regex = /^http:\/\/|https:\/\//;
          return regex.test(str);
      },
      message: 'please enter a valid url',
    }
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('incorrect email or password'));
          }

          return user; 
        });
    });
};

module.exports = mongoose.model('user', userSchema);