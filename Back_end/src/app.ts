import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import './models';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
