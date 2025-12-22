import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Activity, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card/Card';
import Badge from '../components/Badge/Badge';
import { mockDashboardStats } from '../data/dashboard';
import { dashboardAPI } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        // Merge real overview/recent with mock chart data (since charts are complex to aggregate)
        setStats(prev => ({
          ...prev,
          overview: response.data.overview,
          recentAppointments: response.data.recentAppointments.length > 0 ? response.data.recentAppointments : prev.recentAppointments
        }));
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const { overview, appointmentsByMonth, patientsByDepartment, appointmentStatus, topDoctors, recentAppointments } = stats;

  const getStatusBadge = (status) => {
    const variants = {
      'Confirmed': 'success',
      'Pending': 'warning',
      'Completed': 'primary',
      'Cancelled': 'danger'
    };
    return variants[status] || 'default';
  };



  const getStatusIcon = (status) => {
    const icons = {
      'Confirmed': <CheckCircle size={16} />,
      'Pending': <Clock size={16} />,
      'Completed': <CheckCircle size={16} />,
      'Cancelled': <XCircle size={16} />
    };
    return icons[status] || <AlertCircle size={16} />;
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>
          <div className="dashboard-date">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </motion.div>

        {/* Overview Cards */}
        <div className="overview-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="overview-card card-primary">
              <div className="overview-icon" style={{ background: 'rgba(0, 102, 204, 0.1)', color: 'var(--primary-blue)' }}>
                <Users size={32} />
              </div>
              <div className="overview-details">
                <h3>{overview.totalPatients}</h3>
                <p>Total Patients</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overview-card card-success">
              <div className="overview-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                <Activity size={32} />
              </div>
              <div className="overview-details">
                <h3>{overview.totalDoctors}</h3>
                <p>Expert Doctors</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overview-card card-warning">
              <div className="overview-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                <Calendar size={32} />
              </div>
              <div className="overview-details">
                <h3>{overview.appointments}</h3>
                <p>Appointments</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overview-card card-info">
              <div className="overview-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
                <TrendingUp size={32} />
              </div>
              <div className="overview-details">
                <h3>{overview.departments}</h3>
                <p>Departments</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="charts-grid">
          {/* Appointments Trend */}
          <Card className="chart-card">
            <h3 className="chart-title">Monthly Appointments Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#0066cc"
                  strokeWidth={3}
                  dot={{ fill: '#0066cc', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Appointment Status */}
          <Card className="chart-card">
            <h3 className="chart-title">Appointment Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Patients by Department */}
        <Card className="chart-card-full">
          <h3 className="chart-title">Patients by Department</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={patientsByDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="department" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="patients" fill="#0066cc" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Bottom Row - Tables */}
        <div className="tables-grid">
          {/* Top Doctors */}
          <Card className="table-card">
            <h3 className="table-title">Top Performing Doctors</h3>
            <div className="doctors-list">
              {topDoctors.map((doctor, index) => (
                <div key={doctor.id} className="doctor-item">
                  <div className="doctor-rank">#{index + 1}</div>
                  <div className="doctor-info">
                    <h4>{doctor.name}</h4>
                    <p>{doctor.specialization}</p>
                  </div>
                  <div className="doctor-stats">
                    <div className="stat-badge">
                      <Users size={14} />
                      <span>{doctor.patients}</span>
                    </div>
                    <div className="stat-badge rating">
                      <span>⭐ {doctor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Appointments */}
          <Card className="table-card">
            <h3 className="table-title">Recent Appointments</h3>
            <div className="appointments-list">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <h4>{appointment.patient}</h4>
                    <p>{appointment.doctor}</p>
                  </div>
                  <div className="appointment-meta">
                    <span className="appointment-time">
                      <Clock size={14} />
                      {appointment.time}
                    </span>
                    <Badge variant={getStatusBadge(appointment.status)} size="sm">
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
