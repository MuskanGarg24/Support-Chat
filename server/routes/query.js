// The routes for the query model

const {
  addQuery,
  getQueries,
  searchQuery,
  getCurrentAdminQueries,
  getCurrentCustomerQueries,
  getSlots,
  resolveQuery,
} = require("../controllers/query");

const router = require("express").Router();
router.post("/add", addQuery);
router.get("/all", getQueries);
router.post("/search", searchQuery);
router.post("/slots", getSlots);
router.post("/resolve", resolveQuery);
router.get("/admin", getCurrentAdminQueries);
router.get("/customer", getCurrentCustomerQueries);

module.exports = router;
