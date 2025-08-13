const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Inscription
exports.register = async (req, res) => {
	try {
		const { nom, prenom, email, password, role } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ nom, prenom, email, password: hashedPassword, role });
		await user.save();
		res.status(201).json({ message: 'Utilisateur créé', user });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Connexion
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
		const token = jwt.sign({ id: user._id, role: user.role }, 'votre_secret_jwt', { expiresIn: '1d' });
		res.json({ token, user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role } });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
