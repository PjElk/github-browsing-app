// Importing Axios to make HTTP requests
const axios = require("axios");

// Fetch user details from GitHub
const getUserDetails = async (req, res) => {
  const { username } = req.params; // Get the username from request parameters
  try {
    // Make a request to GitHub API
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json(response.data); // Send back the user data
  } catch (error) {
    // Handle errors by sending a 500 status and error message
    res.status(500).json({ error: "Error fetching user details" });
  }
};

// Fetch user repositories from GitHub
const getUserRepos = async (req, res) => {
  const { username } = req.params; // Get the username from request parameters
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    res.json(response.data); // Send back the repository data
  } catch (error) {
    res.status(500).json({ error: "Error fetching repositories" });
  }
};

// Fetch last commits for a specific repository
const getRepoCommits = async (req, res) => {
  const { owner, repo } = req.params; // Get owner and repo from request parameters
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    res.json(response.data.slice(0, 5)); // Return the last 5 commits
  } catch (error) {
    res.status(500).json({ error: "Error fetching commits" });
  }
};

module.exports = {
  getUserDetails,
  getUserRepos,
  getRepoCommits,
};
