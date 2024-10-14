const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/users"); // Import user routes

const app = express(); // Create an Express app
const PORT = process.env.PORT || 5000; // Define the port

app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Use Helmet for security
app.use(express.json()); // Parse JSON requests

// Set up user routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
