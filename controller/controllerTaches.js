const Tache = require('../models/Taches');

// Créer une nouvelle tâche
exports.createTache = async (req, res) => {
	try {
		const tache = new Tache(req.body);
		await tache.save();
		res.status(201).json(tache);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Obtenir toutes les tâches


exports.getAllTaches = async (req, res) => {
	try {
		const { page = 1, limit = 10, sort = 'date' } = req.query;
		const taches = await Tache.find()
			.populate({ path: 'patient', model: 'Patient' })
			.populate({ path: 'docteur', model: 'Doctor' })
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(parseInt(limit));
		const total = await Tache.countDocuments();
		res.json({
			total,
			page: parseInt(page),
			limit: parseInt(limit),
			taches
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Obtenir une tâche par ID

exports.getTacheById = async (req, res) => {
	try {
		const tache = await Tache.findById(req.params.id)
			.populate({ path: 'patient', model: 'Patient' })
			.populate({ path: 'docteur', model: 'Doctor' });
		if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
		res.json(tache);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Mettre à jour une tâche
exports.updateTache = async (req, res) => {
	try {
		const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
		res.json(tache);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Supprimer une tâche
exports.deleteTache = async (req, res) => {
	try {
		const tache = await Tache.findByIdAndDelete(req.params.id);
		if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
		res.json({ message: 'Tâche supprimée' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
