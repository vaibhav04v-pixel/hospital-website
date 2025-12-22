import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import Department from '../models/Department.js';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient').populate('doctor').populate('department');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient').populate('doctor').populate('department');
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId }).populate('doctor').populate('department');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId }).populate('patient').populate('department');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createAppointment = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time, department, reason } = req.body;

    // 1. Resolve Patient
    let patient = await Patient.findOne({ email });
    if (!patient) {
      // Create new patient
      patient = await Patient.create({
        firstName,
        lastName,
        email,
        phone,
        // dateOfBirth is optional now
      });
    }

    // 2. Resolve Department (optional)
    let departmentId = null;
    if (department) {
      // If department is sent as a string name
      const deptDoc = await Department.findOne({ name: { $regex: new RegExp(`^${department}$`, 'i') } });
      if (deptDoc) {
        departmentId = deptDoc._id;
      }
    }

    // 3. Create Appointment
    const appointment = new Appointment({
      patient: patient._id,
      appointmentDate: date,
      time,
      department: departmentId,
      reason,
      status: 'Scheduled'
      // doctor is optional
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const completed = await Appointment.countDocuments({ status: 'Completed' });
    const scheduled = await Appointment.countDocuments({ status: 'Scheduled' });
    const cancelled = await Appointment.countDocuments({ status: 'Cancelled' });

    res.json({ total, completed, scheduled, cancelled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
