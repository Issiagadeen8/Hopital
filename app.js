require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/PatientRoutes');
const doctorRoutes = require('./routes/DoctorRoutes');
const tachesRoutes = require('./routes/TachesRoutes');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/taches', tachesRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => {
  console.log('Connecté à MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('Erreur de connexion à MongoDB:', err);
});
