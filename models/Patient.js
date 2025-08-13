const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
    trim: true
  },
  nom: {
    type: String,
    required: [true, 'Le nom de famille est obligatoire'],
    trim: true
  },
  dateDeNaissance: {
    type: Date,
    
  }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
