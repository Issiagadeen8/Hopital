
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/PatientRoutes');
const doctorRoutes = require('./routes/DoctorRoutes');
const tachesRoutes = require('./routes/TachesRoutes');

const app = express();

// Sécurité
app.use(cors());
app.use(helmet());
app.use(express.json());

// Exemple de validation sur une route (à adapter dans les routes/controllers)
app.post('/api/test-validation',
  body('email').isEmail(),
  body('password').isLength({ min: 4 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Validation réussie !' });
  }
);

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
