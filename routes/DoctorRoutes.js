const express = require('express');
const doctorController = require('../controller/controllerDoctor');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', auth, doctorController.updateDoctor);
router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;
