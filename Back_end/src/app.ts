import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/database';
import './models';
import router from './routes';

const app = express();
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => res.send('SalonDirect API'));

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('Test ENV:', {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
    });

    await sequelize.sync();
    console.log('✅ DB synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
}

startServer();