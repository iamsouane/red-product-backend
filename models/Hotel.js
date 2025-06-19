const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: String, required: true },
  imageSrc: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Hotel', hotelSchema);