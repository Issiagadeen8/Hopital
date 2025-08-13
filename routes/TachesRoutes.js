const express = require('express');
const tacheController = require('../controller/controllerTaches');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, tacheController.createTache);
router.get('/',  tacheController.getAllTaches);
router.get('/:id', tacheController.getTacheById);
router.put('/:id', auth, tacheController.updateTache);
router.delete('/:id', auth, tacheController.deleteTache);

module.exports = router;
