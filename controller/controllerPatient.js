const Patient = require('../models/Patient');

// Créer un nouveau patient
exports.createPatient = async (req, res) => {
	try {
		const patient = new Patient(req.body);
		await patient.save();
		res.status(201).json(patient);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Obtenir tous les patients

exports.getAllPatients = async (req, res) => {
	try {
		const { page = 1, limit = 10, sort = 'nom' } = req.query;
		const patients = await Patient.find()
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(parseInt(limit));
		const total = await Patient.countDocuments();
		res.json({
			total,
			page: parseInt(page),
			limit: parseInt(limit),
			patients
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Obtenir un patient par ID
exports.getPatientById = async (req, res) => {
	try {
		const patient = await Patient.findById(req.params.id);
		if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
		res.json(patient);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Mettre à jour un patient
exports.updatePatient = async (req, res) => {
	try {
		const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
		res.json(patient);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Supprimer un patient
exports.deletePatient = async (req, res) => {
	try {
		const patient = await Patient.findByIdAndDelete(req.params.id);
		if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
		res.json({ message: 'Patient supprimé' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
