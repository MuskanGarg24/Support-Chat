// The routes for the user model

const { register, login } = require("../controllers/user");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);

module.exports = router;
