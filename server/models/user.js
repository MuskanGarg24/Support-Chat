/*
This file contains the schema for the user model. This schema is used to create a collection in the database that will store the user data. The user schema has the following fields:

1. username: The username of the user.
2. email: The email of the user.
3. password: The password of the user.
4. admin: A boolean value indicating whether the user is an admin or not.
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
