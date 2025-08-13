const express = require('express');
const patientController = require('../controller/controllerPatient');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, patientController.createPatient);
router.get('/',  patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', auth, patientController.updatePatient);
router.delete('/:id', auth, patientController.deletePatient);

module.exports = router;
