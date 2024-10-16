const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to get user details
router.get("/:username", userController.getUserDetails); // Correctly use the getUserDetails function

// Route to get user repositories
router.get("/:username/repos", userController.getUserRepos); // Use the getUserRepos function

// Route to get repository commits
router.get("/repos/:username/:repo/commits", userController.getRepoCommits); // Use the getRepoCommits function

module.exports = router;
