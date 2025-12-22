# Integration Example - Converting More Pages to MongoDB

This guide shows how to convert other pages (Doctors, Appointments, Dashboard) to use MongoDB API instead of mock data.

## Pattern to Follow

### Step 1: Import Dependencies
Replace mock data import with API client:

```javascript
// Before:
import { mockDoctors } from '../data/doctors';

// After:
import { doctorsAPI } from '../utils/api';
import { useEffect, useState } from 'react';
```

### Step 2: Update useState
Add loading state and fetch data:

```javascript
// Before:
const [doctors, setDoctors] = useState(mockDoctors);

// After:
const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchDoctors();
}, []);

const fetchDoctors = async () => {
  try {
    setLoading(true);
    const response = await doctorsAPI.getAll();
    setDoctors(response.data.data);
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to load doctors');
  } finally {
    setLoading(false);
  }
};
```

### Step 3: Update CRUD Operations

#### Delete
```javascript
const handleDelete = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await doctorsAPI.delete(id);
      setDoctors(doctors.filter(d => d._id !== id && d.id !== id));
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error('Failed to delete');
    }
  }
};
```

#### Create
```javascript
const handleCreate = async (formData) => {
  try {
    const response = await doctorsAPI.create(formData);
    setDoctors([response.data.data, ...doctors]);
    toast.success('Created successfully');
  } catch (error) {
    toast.error('Failed to create');
  }
};
```

#### Update
```javascript
const handleUpdate = async (id, formData) => {
  try {
    const response = await doctorsAPI.update(id, formData);
    setDoctors(doctors.map(d => d._id === id ? response.data.data : d));
    toast.success('Updated successfully');
  } catch (error) {
    toast.error('Failed to update');
  }
};
```

### Step 4: Fix ID References

MongoDB uses `_id` instead of `id`:

```javascript
// In tables/lists:
{ header: 'ID', accessor: '_id' }

// In deletions:
onClick={() => handleDelete(doctor._id || doctor.id)}

// In keys:
key={doctor._id}
```

### Step 5: Add Loading State to UI

```javascript
{loading ? (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <p>Loading data...</p>
  </div>
) : (
  <Table data={doctors} columns={columns} />
)}
```

---

## Ready-to-Implement: Doctors Page

```javascript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Search, Plus, Trash2, Eye } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import { doctorsAPI } from '../utils/api';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorsAPI.getAll();
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this doctor?')) {
      try {
        await doctorsAPI.delete(id);
        setDoctors(doctors.filter(d => d._id !== id && d.id !== id));
        toast.success('Doctor deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const filteredDoctors = doctors.filter(d =>
    d.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'ID', accessor: '_id' },
    {
      header: 'Doctor Name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={row.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 600 }}>{row.firstName} {row.lastName}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{row.specialization}</div>
          </div>
        </div>
      )
    },
    { header: 'Qualification', accessor: 'qualification' },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Rating', render: (row) => <span>⭐ {row.rating}</span> },
    { header: 'Patients', accessor: 'patients' },
    { header: 'Fee', render: (row) => <span>${row.consultationFee}</span> },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="ghost" icon={<Eye size={16} />} onClick={() => setSelectedDoctor(row)} />
          <Button size="sm" variant="ghost" icon={<Trash2 size={16} />} onClick={() => handleDelete(row._id || row.id)} />
        </div>
      )
    }
  ];

  return (
    <div className="doctors-page">
      <div className="container">
        <motion.div className="page-header-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1>Doctors</h1>
            <p>View and manage all doctors</p>
          </div>
        </motion.div>

        <Card className="search-card">
          <div className="search-wrapper">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        <Card>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading doctors...</div>
          ) : (
            <Table columns={columns} data={filteredDoctors} emptyMessage="No doctors found" />
          )}
        </Card>
      </div>

      {selectedDoctor && (
        <Modal isOpen={!!selectedDoctor} onClose={() => setSelectedDoctor(null)} title="Doctor Details">
          <div className="doctor-details">
            <img src={selectedDoctor.avatar} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h3>{selectedDoctor.firstName} {selectedDoctor.lastName}</h3>
            <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
            <p><strong>Qualification:</strong> {selectedDoctor.qualification}</p>
            <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
            <p><strong>Rating:</strong> ⭐ {selectedDoctor.rating}</p>
            <p><strong>Consultation Fee:</strong> ${selectedDoctor.consultationFee}</p>
            <p><strong>Bio:</strong> {selectedDoctor.bio}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Doctors;
```

---

## Ready-to-Implement: Appointments Page (Simplified)

```javascript
import { useState, useEffect } from 'react';
import { appointmentsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentsAPI.getAll();
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (confirm('Cancel this appointment?')) {
      try {
        await appointmentsAPI.delete(id);
        setAppointments(appointments.filter(a => a._id !== id && a.id !== id));
        toast.success('Appointment cancelled');
      } catch (error) {
        toast.error('Failed to cancel');
      }
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(apt => (
              <tr key={apt._id}>
                <td>{apt.patientName}</td>
                <td>{apt.doctorName}</td>
                <td>{apt.date}</td>
                <td>{apt.time}</td>
                <td>{apt.status}</td>
                <td>
                  <button onClick={() => handleCancel(apt._id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
```

---

## Tips & Best Practices

1. **Always use `_id` or fallback to `id`**: `item._id || item.id`
2. **Add error handling**: Try-catch with toast notifications
3. **Add loading states**: Show spinner while fetching
4. **Cache data**: Consider using React Context or Redux
5. **Add filters**: Search, sort, pagination for large datasets
6. **Validate input**: Before sending to API
7. **Show confirmation**: Before deleting
8. **Handle offline**: Fallback to mock data if API fails

---

## API Response Format

All API responses follow this format:

```javascript
{
  success: true,
  data: [ /* array of items or single item */ ],
  count: 10,
  message: "Operation successful"
}
```

Access data with: `response.data.data`

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot read property '_id'" | Use `item._id \|\| item.id` |
| "Undefined data" | Check `response.data.data` structure |
| "CORS error" | Restart backend, check .env |
| "API returns 404" | Check ID is valid ObjectId |
| "Updates not showing" | Check setState is called after API success |

---

Ready to convert more pages? Copy the patterns above and adapt to your specific pages!
