import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import LoadingSpinner from "../components/LoadingSpinner";

const UserDetailsPage = () => {
  const { username } = useParams(); // Get the username from the URL parameters
  const [repos, setRepos] = useState([]); // State to hold repositories
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [error, setError] = useState(""); // State to hold error messages

  // Fetch repositories when the component mounts
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true); // Show loading
      setError(""); // Reset error message
      try {
        // Fetch repositories from the backend
        const response = await axios.get(
          `http://localhost:5000/api/users/${username}/repos`
        );
        setRepos(response.data); // Set repositories
      } catch (error) {
        console.error("Error fetching repositories:", error); // Log the error for debugging
        if (error.response && error.response.status === 404) {
          setError("User has no repositories or user not found."); // Specific error for 404
        } else {
          setError("Error fetching repositories."); // Generic error message
        }
      } finally {
        setLoading(false); // Hide loading
      }
    };

    fetchRepos(); // Call the fetch function
  }, [username]);

  return (
    <div className="container mt-5">
      <h1>{username}'s Repositories</h1>
      {loading && <LoadingSpinner />} {/* Show loading spinner */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Show error message */}
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} /> // Render each repository card
      ))}
      <Link to="/" className="btn btn-secondary">
        Back to Search
      </Link>{" "}
      {/* Link back to search */}
    </div>
  );
};

export default UserDetailsPage;
