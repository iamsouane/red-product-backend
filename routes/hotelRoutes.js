import express from 'express';
import multer from 'multer';
import path from 'path';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Config multer (stockage local)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // dossier uploads
  },
  filename: (req, file, cb) => {
    // nom unique : timestamp + extension
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// GET all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new hotel + upload photo
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, address, email, phone, price, currency } = req.body;
    let imageUrl = '';

    if (req.file) {
      // URL relative accessible depuis frontend
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newHotel = new Hotel({
      name,
      address,
      email,
      phone,
      price,
      currency,
      imageUrl,
    });

    await newHotel.save();

    res.status(201).json(newHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l’hôtel' });
  }
});

export default router;