# Hospital Management System - MongoDB Integration Guide

## Overview
This hospital management system now uses MongoDB as its database instead of mock data. The backend is built with Node.js/Express and the frontend communicates via REST API.

## Project Structure

```
project-root/
├── server/                  # Backend (Node.js/Express)
│   ├── models/            # MongoDB Schemas
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── Department.js
│   ├── controllers/       # Business Logic
│   ├── routes/           # API Endpoints
│   ├── middleware/       # Custom Middleware
│   └── server.js         # Main Server File
├── src/                   # React Frontend
│   ├── utils/api.js      # API Client (Axios)
│   ├── pages/            # React Pages
│   └── components/       # React Components
├── .env                  # Environment Variables
└── package.json          # Dependencies
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This installs both frontend and backend dependencies:
- **Backend**: express, mongoose, cors, dotenv, nodemon, concurrently
- **Frontend**: react, react-dom, react-router-dom, axios, etc.

### 2. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: Follow MongoDB installation guide

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/hospital_management`

### 3. Configure Environment Variables

Edit `.env` file:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/hospital_management

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_management

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_change_in_production
```

### 4. Start the Application

**Option A: Separate Terminals**
```bash
# Terminal 1 - Start Backend
npm run server:dev

# Terminal 2 - Start Frontend
npm run dev
```

**Option B: Single Command (Concurrently)**
```bash
npm start
```

## API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/search?query=name` - Search patients

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/department/:departmentId` - Get doctors by department
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor
- `GET /api/doctors/search?query=name` - Search doctors

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/patient/:patientId` - Get patient's appointments
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/appointments/stats/overview` - Get statistics

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

## Database Models

### Patient Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required),
  dateOfBirth: Date (required),
  gender: String (Male/Female/Other),
  bloodGroup: String (A+, A-, B+, B-, O+, O-, AB+, AB-),
  address: String (required),
  emergencyContact: String (required),
  insurance: String,
  medicalHistory: [String],
  avatar: String,
  status: String (Active/Inactive/Archived),
  lastVisit: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  specialization: String (required),
  department: ObjectId (ref: Department),
  qualification: String (required),
  experience: String,
  email: String (required, unique),
  phone: String (required),
  rating: Number (0-5),
  patients: Number,
  consultationFee: Number (required),
  availableDays: [String],
  availableTime: String,
  bio: String,
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```javascript
{
  patientId: ObjectId (ref: Patient, required),
  patientName: String,
  doctorId: ObjectId (ref: Doctor, required),
  doctorName: String,
  department: String,
  date: Date (required),
  time: String (required),
  status: String (Pending/Confirmed/Completed/Cancelled),
  type: String (New Patient/Follow-up/Check-up/Consultation),
  reason: String (required),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Department Model
```javascript
{
  name: String (required, unique),
  icon: String,
  description: String (required),
  services: [String],
  stats: {
    procedures: String,
    successRate: String,
    availability: String
  },
  doctors: Number,
  image: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend API Usage

### Using the API Client

The frontend uses Axios with pre-configured API client in `src/utils/api.js`:

```javascript
import { patientsAPI, doctorsAPI, appointmentsAPI, departmentsAPI } from '../utils/api';

// Get all patients
const response = await patientsAPI.getAll();

// Create patient
const newPatient = await patientsAPI.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  // ... other fields
});

// Update patient
await patientsAPI.update(patientId, { firstName: 'Jane' });

// Delete patient
await patientsAPI.delete(patientId);

// Search patients
await patientsAPI.search('John');
```

### Error Handling

```javascript
try {
  const response = await patientsAPI.getAll();
  setPatients(response.data.data);
} catch (error) {
  console.error('Error:', error);
  toast.error('Failed to load patients');
}
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access (for Atlas)
- Check MongoDB logs: `tail -f /var/log/mongodb/mongod.log`

### CORS Issues
- Backend CORS is configured for `http://localhost:3000`
- Update `.env` ALLOWED_ORIGINS if needed
- Ensure frontend URL matches backend CORS config

### API Not Responding
- Check backend is running: `npm run server:dev`
- Verify API URL in `.env.local`: `VITE_API_URL=http://localhost:5000/api`
- Check browser console for errors
- Test API with Postman: `http://localhost:5000/api/health`

## Next Steps

1. **Add Authentication**: Implement JWT tokens and password hashing with bcrypt
2. **Add Validation**: Implement input validation middleware
3. **Add Logging**: Integrate winston for better logging
4. **Add Tests**: Create unit and integration tests
5. **Deploy**: Deploy backend to Heroku/Railway and frontend to Vercel/Netlify

## Production Checklist

- [ ] Change JWT_SECRET in `.env`
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement proper authentication with bcrypt
- [ ] Add request validation
- [ ] Set up logging and monitoring
- [ ] Deploy frontend and backend separately

## Support

For issues, check:
1. MongoDB connection
2. Environment variables
3. Backend server running
4. Frontend dev server running
5. Browser console for errors
6. Network tab in browser dev tools
