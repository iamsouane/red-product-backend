const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const hotelRoutes = require('./routes/hotelRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hotels', hotelRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connecté');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`🚀 Serveur en écoute sur le port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error('Erreur MongoDB :', err);
    });