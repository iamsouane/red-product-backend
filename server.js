import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import hotelsRoutes from './routes/hotelRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables depuis .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// CORS pour accepter les requêtes front
app.use(cors());

// Static files (ex: upload d'images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connecté'))
  .catch((err) => console.error('❌ Connexion MongoDB échouée :', err.message));

// Routes API
app.use('/api/hotels', hotelsRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend actif sur le port ${PORT}`);
});