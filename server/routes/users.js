const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  getUserRepos,
  getRepoCommits,
} = require("../controllers/userController"); // Import controller functions

// Route to get user details
router.get("/:username", getUserDetails); // Use controller function

// Route to get user repositories
router.get("/:username/repos", getUserRepos); // Use controller function

// Route to get commits for a specific repo
router.get("/:owner/:repo/commits", getRepoCommits); // Use controller function

module.exports = router;
