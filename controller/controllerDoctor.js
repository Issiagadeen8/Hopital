const Doctor = require('../models/Doctor');

// Créer un nouveau docteur
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les docteurs

exports.getAllDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'nom' } = req.query;
    const doctors = await Doctor.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Doctor.countDocuments();
    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      doctors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un docteur par ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Docteur non trouvé' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un docteur
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Docteur non trouvé' });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un docteur
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Docteur non trouvé' });
    res.json({ message: 'Docteur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
