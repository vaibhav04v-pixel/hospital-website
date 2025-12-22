import express from 'express';
import * as patientController from '../controllers/patientController.js';

const router = express.Router();

router.get('/', patientController.getPatients);
router.get('/:id', patientController.getPatientById);
router.get('/search', patientController.searchPatients);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

export default router;
