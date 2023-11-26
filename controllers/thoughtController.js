const { Thought, User } = require('../models');

module.exports = {

  // GET route for all thoughts
  // '/api/thoughts'
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Post route to add a thought
  // '/api/thoughts'
  async postThought(req, res) {
    try {
      const thought = await Thought.create(req.body);      
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } }
      );
      res.json(thought);
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete route to delete single thought
  // '/api/thoughts/:thoughtId'
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .select('-__v');
        
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { thoughts: thought._id }}
        );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought and reactions deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get route to see all reactions to a thought
  // '/api/thoughts/:thoughtId/reactions'
  async getReactions(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      const reactions = thought.reactions;
      res.json(reactions);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Post route to add a reaction to a thought
  // '/api/thoughts/:thoughtId/reactions'
  async postReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete route to remove a reaction from a thought
  // '/api/thoughts/:thoughtId/reactions/:reactionId'
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, 
        { $pull: { reactions: { _id: req.params.reactionId }}}
        );
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

}