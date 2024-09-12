const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://atharvx.vercel.app', // Your deployed frontend URL
  'http://localhost:5173' // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from allowedOrigins or no origin (for server-to-server requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors()); 

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
