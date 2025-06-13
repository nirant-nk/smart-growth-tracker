import mongoose from 'mongoose';
import { MONGO_URI } from '../constants.js';

export function connectDB() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  return mongoose.connect(MONGO_URI); // Clean and up-to-date
}
