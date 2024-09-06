const Query = require("../models/query");

// Function to add a query to the database
const addQuery = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const query = new Query({
      userId,
      message,
    });
    if (await query.save()) {
      res.status(201).json({
        message: "Query added successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to add query",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to get all queries of a user from the database
const getQueries = async (req, res) => {
  try {
    const { userId } = req.body;
    let queries;
    if (userId == "") {
      queries = await Query.find({ requested: "" }).sort({ timestamp: 1 });
    } else {
      queries = await Query.find({ userId, resolved: "" }).sort({
        timestamp: 1,
      });
    }
    if (queries) {
      res.status(200).json({
        queries,
      });
    } else {
      res.status(400).json({
        message: "Failed to get queries",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to search queries in the database
const searchQuery = async (req, res) => {
  try {
    const { search } = req.body;
    let regex = new RegExp(search, "i");
    const queries = await Query.find({
      requested: "",
      message: { $regex: regex },
    }).sort({ timestamp: 1 });
    if (queries) {
      res.status(200).json({
        queries,
      });
    } else {
      res.status(400).json({
        message: "Failed to search queries",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to get the current admin queries that are not resolved
const getCurrentAdminQueries = async (req, res) => {
  try {
    const { userId } = req.body;
    const queries = await Query.find({ requested: userId, resolved: "" }).sort({
      timestamp: 1,
    });
    if (queries) {
      res.status(200).json({
        queries,
      });
    } else {
      res.status(400).json({
        message: "Failed to get queries",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to get the queries resolved by the admin
const getCurrentCustomerQueries = async (req, res) => {
  try {
    const { userId } = req.body;
    const queries = await Query.find({ userId, resolved: { $ne: "" } }).sort({
      timestamp: 1,
    });
    if (queries) {
      res.status(200).json({
        queries,
      });
    } else {
      res.status(400).json({
        message: "Failed to get queries",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to get the queries resolved by the admin
const getSlots = async (req, res) => {
  try {
    const { userId, ids } = req.body;
    const queries = await Query.updateMany(
      { _id: { $in: ids } },
      { requested: userId }
    );
    if (queries) {
      res.status(200).json({
        message: "Slots booked successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to resolve queries",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to resolve a query
const resolveQuery = async (req, res) => {
  try {
    const { queryId, solution } = req.body;
    const query = await Query.findOneAndUpdate(
      { _id: queryId },
      { resolved: solution }
    );
    if (query) {
      res.status(200).json({
        message: "Query resolved successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to resolve query",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addQuery,
  getQueries,
  searchQuery,
  getCurrentAdminQueries,
  getCurrentCustomerQueries,
  getSlots,
  resolveQuery,
};
