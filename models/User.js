const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').
  get(function () {
  return this.friends.length;
});

userSchema.plugin(uniqueValidator);

const User = model('user', userSchema);

module.exports = User;