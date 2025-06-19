const Hotel = require('../models/Hotel');

// GET all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new hotel
exports.createHotel = async (req, res) => {
  const { name, address, price, imageSrc } = req.body;

  if (!name || !address || !price || !imageSrc) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const newHotel = new Hotel({ name, address, price, imageSrc });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};