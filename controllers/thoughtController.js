const { Thought, Reaction } = require('../models');
const User = require('../models/User');

module.exports = {

  // GET route for all thoughts
  // '/api/thoughts'
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Post route to add a thought
  // '/api/thoughts'
  async createThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const thought = await Thought.create(req.body);
      user.thought.push(thought._id);
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get route for single thought
  // '/api/thoughts/:thoughtId'
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Put route to update single thought
  // '/api/thoughts/:thoughtId'
async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }, 
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete route to delete single thought
  // '/api/thoughts/:thoughtId'
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      await Reaction.deleteMany({ _id: { $in: thought.reactions } });
      res.json({ message: 'Thought and reactions deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get route to see all reactions to a thought
  // '/api/thoughts/:thoughtId/reactions'
  async getReactions(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      const reactions = await Reaction.findAll({ _id: { $in: thought.reactions } });
      res.json(reactions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Post route to add a reaction to a thought
  // '/api/thoughts/:thoughtId/reactions'
  async postReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      const reaction = await Reaction.create(req.body);
      thought.reactions.push(reaction._id);
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get route to see specific reaction to a thought
  // '/api/thoughts/:thoughtId/reactions/:reactionId'
  async getSingleReaction(req, res) {
    try {
      const reaction = await Reaction.find({ _id: req.params.reactionId });
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete route to remove a reaction from a thought
  // '/api/thoughts/:thoughtId/reactions/:reactionId'
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.destroy({ _id: req.params.reactionId });
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}