import express from 'express';
import * as doctorController from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/department/:departmentId', doctorController.getDoctorsByDepartment);
router.get('/search', doctorController.searchDoctors);
router.post('/', doctorController.createDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export default router;
