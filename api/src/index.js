import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import './config.js'; // loads .env before anything else

import { PORT } from './constants.js';
import { connectDB } from './database/connect.js';
import { errorHandler } from './middlewares/errorHandler.js';
import childRoute from './routes/child.route.js';
import growthRoute from './routes/growth.route.js';
import recommendationRoute from './routes/recommendation.route.js';
import userRoute from './routes/user.route.js';


const app = express();

// Middleware
app.use(helmet());          // Sets secure HTTP headers
app.use(cors());            // Enables Cross-Origin Resource Sharing
app.use(express.json());    // Parses incoming JSON

// Routes
app.use('/api/users', userRoute);
app.use('/api/children', childRoute);
app.use('/api/children/:childId/growth', growthRoute);
app.use('/api/children/:childId/recommendations', recommendationRoute);

// Error handler
app.use(errorHandler);

// Start server
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error', err));
