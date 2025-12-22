import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatient);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctor);
router.get('/stats/overview', appointmentController.getStats);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.patch('/:id/cancel', appointmentController.cancelAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

export default router;
