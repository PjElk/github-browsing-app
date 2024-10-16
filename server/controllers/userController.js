const axios = require("axios");

// Fetch user details from GitHub
const getUserDetails = async (req, res) => {
  const { username } = req.params; // Extract username from URL
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json(response.data); // Return user data
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching user details", details: error.message });
  }
};

// Fetch user repositories from GitHub
const getUserRepos = async (req, res) => {
  const { username } = req.params; // Extract username from URL
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    res.json(response.data); // Return user repositories
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching repositories", details: error.message });
  }
};

// Fetch last commits for a specific repository
const getRepoCommits = async (req, res) => {
  const { username, repo } = req.params; // Extract username and repo from URL
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/commits`
    );
    res.json(response.data.slice(0, 5)); // Return the last 5 commits
  } catch (error) {
    console.error("Error fetching commits:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching commits", details: error.message });
  }
};

module.exports = {
  getUserDetails,
  getUserRepos,
  getRepoCommits,
};
