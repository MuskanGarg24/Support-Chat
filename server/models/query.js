/* 
This file contains the schema for the query model. This schema is used to create a collection in the database that will store the query data. The query schema has the following fields:

1) userId: The ID of the user who made the query.
2) timestamp: The timestamp when the query was made. 
3) message: The message of the query.
4) requested: The response to the query requested by the user.
5) resolved: The response to the query provided by the admin.
*/

const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  requested: {
    type: String,
    required: false,
    default: "",
  },
  resolved: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("Query", querySchema);
