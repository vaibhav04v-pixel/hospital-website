# 🏥 MongoDB Integration Complete - Quick Start Guide

## What Was Added

✅ **Express.js Backend Server** with MongoDB integration  
✅ **MongoDB Models** for Patients, Doctors, Appointments, Departments  
✅ **REST API Endpoints** for all resources  
✅ **API Client** (Axios) for React components  
✅ **Seed Data Script** to populate initial data  
✅ **Environment Configuration** files  

---

## 🚀 Quick Start (5 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install & Start MongoDB

**Windows:**
1. Download MongoDB Community: https://www.mongodb.com/try/download/community
2. Install it
3. Start MongoDB Service:
   ```bash
   # In PowerShell as Administrator
   net start MongoDB
   # or use MongoDB Compass GUI
   ```

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or Use MongoDB Atlas (Cloud)** - No installation needed!
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env`: `MONGODB_URI=mongodb+srv://...`

### Step 3: Seed Initial Data (Optional)
```bash
npm run seed
```
This creates sample patients, doctors, appointments, and departments.

### Step 4: Start the Application
**Option A - Separate terminals (easier to debug):**
```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run dev
```

**Option B - Single command:**
```bash
npm start
```

### Step 5: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Test API health: http://localhost:5000/api/health

---

## 📁 New Project Structure

```
project-root/
├── server/
│   ├── models/
│   │   ├── Patient.js          # Patient schema
│   │   ├── Doctor.js           # Doctor schema
│   │   ├── Appointment.js      # Appointment schema
│   │   └── Department.js       # Department schema
│   ├── controllers/
│   │   ├── patientController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   ├── departmentController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   ├── departments.js
│   │   └── auth.js
│   ├── middleware/
│   ├── seed.js                 # Seed database with initial data
│   └── server.js               # Main server file
├── src/
│   ├── utils/
│   │   └── api.js              # Axios API client (NEW!)
│   └── pages/
│       └── Patients.jsx        # Updated to use API (MODIFIED!)
├── .env                        # Environment variables
├── .env.local                  # Frontend API URL
├── MONGODB_SETUP.md            # Detailed setup guide
├── QUICK_START.md              # This file
└── package.json                # Updated with new scripts & dependencies
```

---

## 🔧 Configuration Files

### `.env` (Backend Configuration)
```env
MONGODB_URI=mongodb://localhost:27017/hospital_management
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_secret_key_here
```

### `.env.local` (Frontend Configuration)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints Reference

### Patients
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/patients` | Get all patients |
| POST | `/api/patients` | Create patient |
| GET | `/api/patients/:id` | Get patient details |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Delete patient |
| GET | `/api/patients/search?query=name` | Search patients |

### Doctors
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/doctors` | Get all doctors |
| POST | `/api/doctors` | Create doctor |
| GET | `/api/doctors/:id` | Get doctor details |
| GET | `/api/doctors/department/:id` | Doctors by department |
| DELETE | `/api/doctors/:id` | Delete doctor |

### Appointments
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Book appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Cancel appointment |
| GET | `/api/appointments/patient/:id` | Patient's appointments |
| GET | `/api/appointments/stats/overview` | Get statistics |

### Departments
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/departments` | Get all departments |
| POST | `/api/departments` | Create department |

---

## 💻 Using the API in React

### Example: Fetch Patients
```javascript
import { patientsAPI } from '../utils/api';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await patientsAPI.getAll();
        setPatients(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? 'Loading...' : 
        patients.map(patient => (
          <div key={patient._id}>
            {patient.firstName} {patient.lastName}
          </div>
        ))
      }
    </div>
  );
}
```

### Example: Create Patient
```javascript
const newPatient = await patientsAPI.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1-234-567-8900',
  dateOfBirth: '1990-01-01',
  gender: 'Male',
  bloodGroup: 'O+',
  address: '123 Main St',
  emergencyContact: '+1-987-654-3210',
  insurance: 'Blue Cross'
});
```

### Example: Delete Patient
```javascript
await patientsAPI.delete(patientId);
```

---

## 🛠️ Available NPM Scripts

```bash
npm run dev              # Start React dev server
npm run server:dev      # Start backend with hot reload
npm start               # Start both frontend & backend together
npm run seed            # Populate database with sample data
npm run build           # Build React app for production
npm run lint            # Run ESLint
npm run preview         # Preview production build
```

---

## ⚠️ Troubleshooting

### Issue: "Cannot find module mongoose"
```bash
npm install
```

### Issue: "MongoDB connection failed"
- Check if MongoDB is running: `mongo` (or `mongosh`)
- Check MONGODB_URI in `.env`
- For Atlas, verify network access is allowed

### Issue: "CORS error" in browser console
- Ensure backend is running on port 5000
- Check FRONTEND_URL in `.env` matches your frontend URL
- Verify `.env.local` has correct API URL

### Issue: "API returns 404"
- Verify backend server is running: `http://localhost:5000/api/health`
- Check route paths match in controller files
- Look at backend console for error messages

### Issue: Cannot access MongoDB Atlas
- Check username/password in connection string
- Add your IP to Network Access whitelist in Atlas
- Ensure database name in URI matches what you created

---

## 📚 Updated Components

### Patients.jsx (Now Connected to Database)
- ✅ Fetches patients from MongoDB on mount
- ✅ Create new patients via API
- ✅ Delete patients from database
- ✅ Search functionality
- ✅ Real-time UI updates

**Other pages still using mock data:**
- Doctors.jsx (can be updated next)
- Appointments.jsx (can be updated next)
- Dashboard.jsx (can be updated next)

To update more pages, follow the same pattern as Patients.jsx.

---

## 🔐 Security Notes (Before Production)

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Add rate limiting
- [ ] Implement proper authentication with bcrypt
- [ ] Add input validation
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Add request logging and monitoring

---

## 📖 Full Documentation

See **MONGODB_SETUP.md** for:
- Detailed MongoDB setup instructions
- Complete API documentation
- Database schema details
- Production deployment guide
- Advanced configuration

---

## 🎉 You're Ready!

Your hospital management system now has:
- ✅ Real MongoDB database
- ✅ REST API backend
- ✅ React frontend integrated with API
- ✅ Full CRUD operations
- ✅ Sample data to test with

**Next steps:**
1. Run `npm install`
2. Start MongoDB
3. Run `npm run seed` (optional)
4. Run `npm start` or `npm run server:dev` + `npm run dev`
5. Visit http://localhost:3000

Happy coding! 🚀
