import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [username, setUsername] = useState(""); // State to hold the username input
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [error, setError] = useState(""); // State to hold error messages

  const handleSearch = async () => {
    const trimmedUsername = username.trim(); // Trim the username input
    console.log("Searching for user:", trimmedUsername); // Log the trimmed username
    setLoading(true); // Show loading
    setError(""); // Reset error message
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/${trimmedUsername}`
      ); // Fetch user data from backend
      console.log("API Response:", response.data); // Log the API response for debugging
      setUserData(response.data); // Set user data
    } catch (error) {
      console.error("Error in frontend:", error); // Log the error for debugging
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log response data if available
        if (error.response.status === 404) {
          setError("User not found."); // Specific error for 404
        } else {
          setError("Error fetching data."); // Generic error message
        }
      } else {
        setError("Error fetching data."); // Handle cases with no response
      }
      setUserData(null); // Reset user data
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="container mt-5">
      <h1>GitHub User Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          placeholder="Enter GitHub username"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <LoadingSpinner />} {/* Show loading spinner */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Show error message */}
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt={userData.name} width="100" />
          <p>{userData.bio}</p>
          <Link to={`/users/${userData.login}`} className="btn btn-secondary">
            View Repositories
          </Link>{" "}
          {/* Link to user details */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
