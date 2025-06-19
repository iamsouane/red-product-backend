const express = require('express');
const router = express.Router();
const { getHotels, createHotel } = require('../controllers/hotelController');

router.get('/', getHotels);
router.post('/', createHotel);

module.exports = router;