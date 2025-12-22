# Hospital Management System - Restructured

## New Folder Structure

```
react-app/
├── backend/              (Node.js/Express/MongoDB)
│   ├── server/
│   │   ├── server.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── seed.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
├── frontend/             (React/Vite)
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── node_modules/
│
└── README.md
```

## Running the Application

### Option 1: Run Backend First, Then Frontend (Recommended)

**Terminal 1 - Backend:**
```powershell
cd d:\react-app\backend
npm install
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```powershell
cd d:\react-app\frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:3000`

### Option 2: Run Each in Separate Folders (One-time)

**Backend Setup:**
```powershell
cd d:\react-app\backend
npm install
npm run seed          # Seed database with sample data (optional)
npm run dev           # Start backend
```

**Frontend Setup:**
```powershell
cd d:\react-app\frontend
npm install
npm run dev           # Start frontend
```

## Important Notes

1. **MongoDB must be running** before starting the backend
   ```powershell
   mongod
   ```

2. **Backend starts first**, then frontend
   - Backend: `localhost:5000`
   - Frontend: `localhost:3000`

3. **API Calls**: Frontend calls backend at `http://localhost:5000`
   - Configured in `frontend/src/utils/api.js`

4. **Environment Variables**:
   - Backend `.env` file is in `backend/.env`
   - Update MongoDB URI if needed

## Commands Quick Reference

### Backend
- `npm run dev` - Start with auto-reload (nodemon)
- `npm start` - Start server
- `npm run seed` - Populate MongoDB with sample data

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

- **Backend connection error**: Ensure MongoDB is running
- **Frontend can't reach backend**: Check `backend/.env` PORT is 5000
- **Port already in use**: Kill process or use different port
