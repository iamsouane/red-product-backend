import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import hotelsRoutes from './routes/hotelRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connexion MongoDB (via URI Atlas dans MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas connecté'))
.catch((err) => console.error('❌ Connexion MongoDB échouée :', err.message));

// Middlewares
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/hotels', hotelsRoutes);

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend actif sur le port ${PORT}`);
});