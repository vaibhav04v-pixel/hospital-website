import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Contact Us</h1>
            <p>Get in touch with us for any inquiries or support</p>
          </motion.div>
        </div>
      </div>

      <div className="container page-content">
        <div className="contact-grid">
          <div className="contact-info-section">
            <Card className="contact-card">
              <div className="contact-icon"><MapPin size={32} /></div>
              <h3>Address</h3>
              <p>123 Healthcare Avenue<br />Medical City, MC 12345<br />United States</p>
            </Card>

            <Card className="contact-card">
              <div className="contact-icon"><Phone size={32} /></div>
              <h3>Phone Numbers</h3>
              <p>
                Main: +1 (555) 123-4567<br />
                Emergency: +1 (555) 911-HELP<br />
                Fax: +1 (555) 123-4568
              </p>
            </Card>

            <Card className="contact-card">
              <div className="contact-icon"><Mail size={32} /></div>
              <h3>Email Addresses</h3>
              <p>
                info@cloudcarehospital.com<br />
                appointments@cloudcarehospital.com<br />
                emergency@cloudcarehospital.com
              </p>
            </Card>

            <Card className="contact-card">
              <div className="contact-icon"><Clock size={32} /></div>
              <h3>Working Hours</h3>
              <p>
                Mon - Fri: 8:00 AM - 8:00 PM<br />
                Saturday: 9:00 AM - 5:00 PM<br />
                Sunday: Closed<br />
                Emergency: 24/7
              </p>
            </Card>
          </div>

          <Card className="contact-form-card">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={<Phone size={18} />}
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <div className="input-group">
                <label className="input-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  rows="6"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth icon={<Send size={18} />}>
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
