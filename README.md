# CloudCare Hospital Management System

A modern, full-stack Hospital Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application provides a comprehensive solution for managing hospital operations, including patient records, doctor schedules, appointments, and departmental organization.

## 🚀 Features

### Core Roles
- **Admin Dashboard**: Centralized control for hospital administrators to manage all aspects of the system.
- **Doctor Portal**: (Planned) Interface for doctors to view schedules and patient details.
- **Patient Portal**: (Planned) Interface for patients to book appointments and view history.

### Key Functionalities
- **Patient Management**: 
  - Register and manage patient profiles.
  - Track medical history and appointments.
- **Doctor Management**: 
  - Detailed doctor profiles with specializations, qualifications, and availability.
  - Department association.
- **Appointment System**: 
  - Real-time appointment scheduling.
  - Status tracking (Scheduled, Completed, Cancelled).
- **Department Management**: 
  - Organize hospital units (Cardiology, Neurology, Pediatrics, etc.).
- **Authentication & Security**: 
  - Secure JWT-based authentication.
  - Role-based route protection.
- **Modern UI/UX**: 
  - Responsive design using React and modern CSS.
  - Interactive charts and dashboards.
  - Smooth animations with Framer Motion.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (v6)
- **Styling**: Modern CSS3, [Framer Motion](https://www.framer.com/motion/) for animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **CORS**: Enabled for secure cross-origin requests

## ⚙️ Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas URL)
- [Git](https://git-scm.com/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cloudcare-hospital-react.git
   cd cloudcare-hospital-react
   ```

2. **Install Dependencies**
   
   Install dependencies for both frontend and backend from the root directory:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory (or root depending on your setup, check `server.js` path):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cloudcare_db
   JWT_SECRET=your_super_secret_key_here
   ALLOWED_ORIGINS=http://localhost:5173
   ```

   *Note: Ensure your MongoDB server is running.*

4. **Seed the Database**
   
   Populate the database with initial data (Admin user, Doctors, Departments):
   ```bash
   # From the root directory
   npm run seed
   # OR from backend directory
   node server/seed.js
   ```
   
   **Default Admin Credentials:**
   - Email: `admin@cloudcare.com`
   - Password: `password`

## 🚀 Running the Application

 You can run both the backend and frontend concurrently from the root directory:

 ```bash
 npm start
 ```
 
 Or run them separately:

 **Backend:**
 ```bash
 # Terminal 1
 npm run server:dev
 ```

 **Frontend:**
 ```bash
 # Terminal 2
 npm run dev
 ```

 Access the application at: `http://localhost:5173`

## 📂 Project Structure

```
cloudcare-hospital-react/
├── backend/                # Node.js/Express Backend
│   ├── server/
│   │   ├── controllers/    # Route logic
│   │   ├── models/         # Mongoose Schemas
│   │   ├── routes/         # API Routes
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages (Dashboard, Patients, etc.)
│   │   ├── App.jsx         # Main Component
│   │   └── main.jsx        # Entry point
│   └── package.json
└── package.json            # Root configuration
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | | |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| **Patients** | | |
| GET | `/api/patients` | Get all patients |
| POST | `/api/patients` | Add a new patient |
| GET | `/api/patients/:id` | Get patient details |
| **Doctors** | | |
| GET | `/api/doctors` | Get all doctors |
| POST | `/api/doctors` | Add a new doctor |
| **Appointments** | | |
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Schedule an appointment |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ for better healthcare management.*
