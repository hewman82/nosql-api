const { ObjectId } = require('bson');
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Getter function to format date
function formatDate(createdAt) {
    const formatMe = new Date(createdAt);
    const local = formatMe.toLocaleDateString();
    return local;
};

module.exports = reactionSchema;