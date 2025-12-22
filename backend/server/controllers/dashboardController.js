import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Department from '../models/Department.js';

export const getDashboardStats = async (req, res) => {
    try {
        const totalPatients = await Patient.countDocuments();
        const totalDoctors = await Doctor.countDocuments();
        const totalAppointments = await Appointment.countDocuments();
        const totalDepartments = await Department.countDocuments();

        const recentAppointments = await Appointment.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('patient', 'firstName lastName')
            .populate('doctor', 'firstName lastName')
            .select('time status appointmentDate reason');

        const formattedRecent = recentAppointments.map(app => ({
            id: app._id,
            patient: `${app.patient.firstName} ${app.patient.lastName}`,
            doctor: `Dr. ${app.doctor.firstName} ${app.doctor.lastName}`,
            time: app.time, // Note: In a real app we might want to format date + time
            status: app.status
        }));

        res.json({
            overview: {
                totalPatients,
                totalDoctors,
                appointments: totalAppointments,
                departments: totalDepartments
            },
            recentAppointments: formattedRecent
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
