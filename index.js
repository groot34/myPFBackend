const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and handle CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Set this to your actual frontend URL in production
}));
app.use(express.json());

// Import the send-email route handler
const sendEmailHandler = require('./api/send-email');

// Set up the route for sending email
app.post('/send-email', sendEmailHandler);

// Simple route to test the server
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

// Start the server for local development
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
