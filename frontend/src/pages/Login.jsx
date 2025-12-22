import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Activity } from 'lucide-react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { authAPI } from '../utils/api';
import './Login.css';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email');
            return;
        }

        setLoading(true);

        // API Call
        try {
            const response = await authAPI.login(formData.email, formData.password);

            if (response.data.success) {
                toast.success('Login successful! Welcome to CloudCare Hospital');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                onLogin();
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="login-header">
                        <div className="login-logo">
                            <Activity size={48} />
                        </div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            icon={<Mail size={20} />}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            icon={<Lock size={20} />}
                            required
                        />

                        <div className="login-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#forgot" className="forgot-password">
                                Forgot password?
                            </a>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <p>Don't have an account? <Link to="/signup" className="forgot-password">Sign up</Link></p>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p>Demo Credentials:</p>
                        <p className="demo-info">
                            Email: <strong>admin@cloudcare.com</strong><br />
                            Password: <strong>password</strong> (min 6 characters)
                        </p>
                    </div>
                </motion.div>

                <div className="login-info">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2>CloudCare Hospital</h2>
                        <p>
                            Access your personalized dashboard to manage patients, appointments,
                            and view important analytics.
                        </p>
                        <ul className="login-features">
                            <li>✓ Manage patient records</li>
                            <li>✓ View appointments & schedules</li>
                            <li>✓ Access real-time analytics</li>
                            <li>✓ Comprehensive reporting tools</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
