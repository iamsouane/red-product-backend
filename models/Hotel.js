import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: String,
  phone: String,
  price: String,
  currency: String,
  imageUrl: String, // URL relative vers /uploads/nomFichier
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);