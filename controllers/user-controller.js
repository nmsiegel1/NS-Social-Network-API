const { User, Thought } = require("../models");

const userController = {
  //  get all users
  // GET /api/users
  getAllUsers(req, res) {
    User.find({})
      // populate users thoughts
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      // populate users friends
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // get user by id
  // GET /api/users/:userId
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      //  populate users thoughts
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      //   populate users friends
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        // if no user found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //   create user
  // POST /api/users
  // expects "email" "example@email.com", "username" "example"
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update user by id
  // PUT /api/users/:userId
  // able to update username, email or both
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete user
  // DELETE /api/users/:userId
  deleteUser({ params, body }, res) {
    User.findOneAndDelete({ _id: params.userId })
      // delete the users thoughts when user is deleted
      .then((body) => {
        return Thought.deleteMany({ username: { $in: body.username } });
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json({ message: "User and their associated thoughts deleted" });
      })
      .catch((err) => res.json(err));
  },

  //   add friend
  // POST api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete friend
  // DELETE api/users/:userId/friends/:friendId
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json({ message: "Friend removed." });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
