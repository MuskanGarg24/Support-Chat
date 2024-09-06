// The routes for the user model

const { signup, login } = require("../controllers/user");

const router = require("express").Router();
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
