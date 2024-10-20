const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/users", userRoutes); // Set up user routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
