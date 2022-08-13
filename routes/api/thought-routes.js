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

// < GET, POST >/api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// <GET, PUT, DELETE> /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtsById)
  .put(updateThought)
  .delete(removeThought);

// POST/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// DELETE/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
