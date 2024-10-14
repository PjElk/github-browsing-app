const express = require("express");
const router = express.Router();
const axios = require("axios");

// Fetch user details
router.get("/:username", async (req, res) => {
  const { username } = req.params; // Extract username from URL
  try {
    // Fetch data from GitHub API
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json(response.data); // Return user data
  } catch (error) {
    console.error("Error fetching user details:", error.message); // Log error message
    // more detailed error response
    res
      .status(500)
      .json({ error: "Error fetching user details", details: error.message });
  }
});

module.exports = router;
