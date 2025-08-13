const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  specialite: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  dateNaissance: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', doctorSchema);
