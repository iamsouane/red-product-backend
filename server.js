import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import hotelsRoutes from './routes/hotelRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Config __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/hotelsdb')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(console.error);

// Middleware CORS pour autoriser frontend local
app.use(cors());

// Middleware pour servir les fichiers images uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/hotels', hotelsRoutes);

// Démarrage serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});