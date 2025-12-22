import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  floor: Number,
  phone: String,
  email: String,
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Department', departmentSchema);
