const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
	titre: { type: String, required: true },
	description: { type: String },
	statut: { type: String, enum: ['en attente', 'en cours', 'terminée'], default: 'en attente' },
	date: { type: Date, default: Date.now },
	patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
	docteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tache', tacheSchema);
