import express from 'express';
import payload from 'payload';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/ces-cms',
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Serve admin panel
app.use('/admin', payload.authenticate);

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

app.listen(3000, async () => {
  payload.logger.info(`Server running on http://localhost:3000`);
});