import express from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';
import { agentController } from './controllers/agent.controller.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// Define port
const PORT = process.env.PORT || 3000;

// Agent route - the main endpoint for our AI agent
app.post('/agent', agentController);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});