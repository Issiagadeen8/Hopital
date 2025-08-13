const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' });
	try {
		const decoded = jwt.verify(token, 'votre_secret_jwt');
		req.user = decoded;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Token invalide' });
	}
};
