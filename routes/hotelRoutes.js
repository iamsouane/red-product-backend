import express from 'express';
import multer from 'multer';
import Hotel from '../models/Hotel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Pour gérer __dirname dans les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📦 Configuration de multer pour les fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

/**
 * ✅ ROUTE POST : Enregistrement d’un nouvel hôtel
 * Endpoint : POST /api/hotels
 */
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, address, email, phone, price, currency } = req.body;
  const imageUrl = req.file ? `/img/${req.file.filename}` : '';
    const newHotel = new Hotel({ name, address, email, phone, price, currency, imageUrl });
    await newHotel.save();

    res.status(201).json(newHotel);
  } catch (err) {
    console.error('❌ Erreur enregistrement hôtel :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

/**
 * ✅ ROUTE GET : Liste des hôtels
 * Endpoint : GET /api/hotels
 */
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (err) {
    console.error('❌ Erreur récupération hôtels :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;