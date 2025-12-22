// Mock Dashboard Statistics
export const mockDashboardStats = {
  overview: {
    totalPatients: 2458,
    totalDoctors: 48,
    appointments: 156,
    departments: 8
  },
  
  recentAppointments: [
    {
      id: 'A001',
      patient: 'John Doe',
      doctor: 'Dr. Sarah Johnson',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 'A002',
      patient: 'Sarah Johnson',
      doctor: 'Dr. Christopher Brown',
      time: '2:00 PM',
      status: 'Pending'
    },
    {
      id: 'A003',
      patient: 'Michael Chen',
      doctor: 'Dr. Michael Chen',
      time: '11:30 AM',
      status: 'Completed'
    }
  ],
  
  appointmentsByMonth: [
    { month: 'Jan', appointments: 120 },
    { month: 'Feb', appointments: 135 },
    { month: 'Mar', appointments: 145 },
    { month: 'Apr', appointments: 160 },
    { month: 'May', appointments: 155 },
    { month: 'Jun', appointments: 170 },
    { month: 'Jul', appointments: 165 },
    { month: 'Aug', appointments: 180 },
    { month: 'Sep', appointments: 175 },
    { month: 'Oct', appointments: 190 },
    { month: 'Nov', appointments: 185 },
    { month: 'Dec', appointments: 156 }
  ],
  
  patientsByDepartment: [
    { department: 'Cardiology', patients: 450 },
    { department: 'Neurology', patients: 380 },
    { department: 'Orthopedics', patients: 520 },
    { department: 'Pediatrics', patients: 410 },
    { department: 'General', patients: 380 },
    { department: 'Dermatology', patients: 318 }
  ],
  
  appointmentStatus: [
    { name: 'Confirmed', value: 68, color: '#10b981' },
    { name: 'Pending', value: 22, color: '#f59e0b' },
    { name: 'Completed', value: 8, color: '#0066cc' },
    { name: 'Cancelled', value: 2, color: '#ef4444' }
  ],
  
  topDoctors: [
    {
      id: 'D001',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      patients: 1250,
      rating: 4.9
    },
    {
      id: 'D008',
      name: 'Dr. James Wilson',
      specialization: 'General Medicine',
      patients: 2100,
      rating: 4.8
    },
    {
      id: 'D010',
      name: 'Dr. Christopher Brown',
      specialization: 'Pediatrics',
      patients: 1800,
      rating: 4.9
    }
  ],
  
  revenueByMonth: [
    { month: 'Jan', revenue: 125000 },
    { month: 'Feb', revenue: 132000 },
    { month: 'Mar', revenue: 145000 },
    { month: 'Apr', revenue: 158000 },
    { month: 'May', revenue: 152000 },
    { month: 'Jun', revenue: 168000 },
    { month: 'Jul', revenue: 162000 },
    { month: 'Aug', revenue: 178000 },
    { month: 'Sep', revenue: 172000 },
    { month: 'Oct', revenue: 188000 },
    { month: 'Nov', revenue: 182000 },
    { month: 'Dec', revenue: 195000 }
  ]
};
