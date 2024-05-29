const express = require("express");
const router = express.Router();
const {
  handleLoginPage_get,
  handleLogin_post,
  handleLogout_get,
} = require("../controllers/admin");

router
  .get("/login", handleLoginPage_get)
  .post("/login", handleLogin_post)
  .get("/logout", handleLogout_get);

module.exports = router;
