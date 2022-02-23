const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        'https://avatars.githubusercontent.com/u/61866994?s=400&u=c6b9b59dcc7fd48e0b2aa21bef764570177be2b9&v=4',
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.Model('User', userSchema);

module.exports = User;
