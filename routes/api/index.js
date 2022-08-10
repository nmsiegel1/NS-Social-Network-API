const router = require("express").Router();
const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

// add prefix of /thoughts to routes created in thought-routes.js and /users in user-routes.js
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
