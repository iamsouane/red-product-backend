import express from 'express';
import multer from 'multer';
import Hotel from '../models/Hotel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Pour gérer __dirname dans ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurer multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// Route POST /api/hotels
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, address, email, phone, price, currency } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newHotel = new Hotel({ name, address, email, phone, price, currency, imageUrl });
    await newHotel.save();

    res.status(201).json(newHotel);
  } catch (err) {
    console.error('Erreur enregistrement hôtel :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;