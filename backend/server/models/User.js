import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, // In a real app, this should be hashed
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'patient'],
        default: 'admin'
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
