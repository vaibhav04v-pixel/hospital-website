import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialization: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  experience: Number,
  qualifications: [String],
  bio: String,
  rating: { type: Number, default: 0 },
  totalPatients: { type: Number, default: 0 },
  availableSlots: [String],
  avatar: String,
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Doctor', doctorSchema);
