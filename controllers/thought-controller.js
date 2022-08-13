const { User, Thought } = require("../models");

const thoughtController = {
  // get all thoughts
  // GET  /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  // get thought by id
  // GET  /api/thoughts/:thoughtId
  getThoughtsById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // add thought
  // POST  /api/thoughts
  // expects "userID" "", "username" "", "thoughtText" ""
  addThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        console.log("_id>>>>", thoughtData._id);
        console.log("body", body);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log("dbuserdata", dbUserData);
        if (!dbUserData) {
          res.json({ message: "No user found with this id!" });
          return;
        }
        res.json({ message: "Thought created!" });
      })
      .catch((err) => res.json(err));
  },

  //   update thought
  // PUT /api/thoughts/:thoughtId
  //able to update username, email, thought text or a combination of these inputs
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove thought
  // DELETE /api/thoughts/:thoughtId
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.json({ message: "No thought found with this id!" });
          return;
        }
        return User.findOneAndUpdate(
          { thoughts: params.thoughtId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.json({ message: "No thought found with this id!" });
          return;
        }
        res.json({ message: "Thought deleted" });
      })
      .catch((err) => res.json(err));
  },

  //   add reaction to thought
  // POST /api/thoughts/:thoughtId/reactions
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //   remove reaction
  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.json({ message: "No thought found with this id!" });
          return;
        }
        res.json({ message: "Reaction deleted." });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
