import React, { useEffect, useState } from "react";
import axios from "axios";

const RepoCard = ({ repo }) => {
  const [commits, setCommits] = useState([]); // State to hold commits
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(""); // State to hold error messages

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // Fetch last 5 commits for the repository
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/repos/${repo.owner.login}/${repo.name}/commits`
        );
        setCommits(response.data); // Set commits
      } catch (error) {
        console.error("Error fetching commits:", error); // Log the error
        setError("Error fetching commits."); // Handle errors
      } finally {
        setLoading(false); // Hide loading
      }
    };

    fetchCommits(); // Call the fetch function
  }, [repo]); // Run this effect when repo changes

  return (
    <div className="repo-card border p-3 mb-3">
      <h3>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>{" "}
      </h3>
      <p>{repo.description}</p>
      <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>{" "}
      <p>Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>{" "}
      <h4>Last 5 Commits</h4>
      {loading ? (
        <p>Loading commits...</p> // Show loading text
      ) : error ? (
        <p className="text-danger">{error}</p> // Show error message
      ) : (
        <ul>
          {commits.map((commit) => (
            <li key={commit.sha}>
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {commit.commit.message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoCard;
