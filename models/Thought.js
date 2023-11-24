const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
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

// Virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').
  get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;