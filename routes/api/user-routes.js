const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// <GET, POST> /api/users
router.route("/").get(getAllUsers).post(createUser);

// <GET, PUT, DELETE> /api/users/:userId
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// <POST, DELETE> api/users/:userId/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
