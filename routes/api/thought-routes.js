const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

//  GET/api/thoughts
router.route("/:").get(getAllThoughts);

// <GET, PUT, DELETE> /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtsById)
  .put(updateThought)
  .delete(removeThought);

//  POST/api/thoughts/:userId
router.route("/:userId").post(addThought);

// POST/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// DELETE/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
