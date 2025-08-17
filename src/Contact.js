import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (form.name && form.email && form.subject && form.message) {
      emailjs.send(
        'service_dvxs0i8',
        'template_xytrhan',
        {
          name: form.name,
          user_name: form.name,
          user_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        '4rIpJ1RKaBOGuKVRQ' // or public key
      )
      .then((result) => {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 3000);
      }, (error) => {
        setError('Failed to send message. Please try again later.');
      })
      .finally(() => setLoading(false));
    } else {
      setError('Please fill in all fields.');
      setLoading(false);
    }
  };

  return (
    <div className="contact-outer-container">
      <h2 className="section-title">Contact Me</h2>
      <form className="contact-form-enhanced" onSubmit={handleSubmit} autoComplete="off">
        <div className="contact-row">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="contact-input"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="contact-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="contact-input"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="contact-textarea"
          value={form.message}
          onChange={handleChange}
          required
        />
        {error && <div className="contact-error" role="alert">{error}</div>}
        <button type="submit" className="contact-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? (
            <span>
              <span className="spinner" style={{ marginRight: 8, display: 'inline-block', width: 18, height: 18, border: '2px solid #14b8a6', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', verticalAlign: 'middle' }}></span>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
        {sent && <div className="popup-success-animated" style={{ marginTop: '1rem' }}>Message sent successfully!</div>}
      </form>
      <div className="contact-info" style={{ marginTop: '2rem', textAlign: 'left' }}>
        <div className="contact-info-item">
          <span role="img" aria-label="email">📧</span>
          <a href="mailto:saudeepadhikari543@gmail.com" style={{ color: '#14b8a6', fontWeight: 600, marginLeft: 8 }}>saudeepadhikari543@gmail.com</a>
        </div>
        <div className="contact-info-item">
          <span role="img" aria-label="location">📍</span>
          <span style={{ color: '#ff0080', fontWeight: 600, marginLeft: 8 }}>Nepal</span>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .contact-row {
            flex-direction: column;
            gap: 0.7rem;
          }
          .contact-input, .contact-textarea {
            width: 100%;
            min-width: 0;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;

/* CSS (App.css)
.contact-outer-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.section-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}
.contact-form-enhanced {
  display: flex;
  flex-direction: column;
}
.contact-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.contact-input, .contact-textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.contact-textarea {
  resize: vertical;
  min-height: 100px;
}
.contact-btn {
  padding: 0.75rem;
  background: #14b8a6;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background 0.3s;
}
.contact-btn:hover {
  background: #0e9488;
}
.popup-success-animated {
  position: fixed;
  top: 30px;
  right: 30px;
  min-width: 260px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2rem 1.2rem 1.2rem;
  background: linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(20,184,166,0.18), 0 2px 8px rgba(0,0,0,0.08);
  font-size: 1.15rem;
  font-weight: 500;
  z-index: 2000;
  animation: popup-slide-in 0.6s cubic-bezier(.23,1.02,.64,1) forwards;
}
.popup-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popup-bounce 0.7s cubic-bezier(.23,1.02,.64,1);
}
.popup-message {
  flex: 1;
  letter-spacing: 0.01em;
}
@keyframes popup-slide-in {
  0% { opacity: 0; transform: translateY(-40px) scale(0.95); }
  60% { opacity: 1; transform: translateY(8px) scale(1.03); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes popup-bounce {
  0% { transform: scale(0.7); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.popup-error {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 4px;
  z-index: 1000;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
.contact-info {
  margin-top: 1.5rem;
  text-align: center;
}
.contact-info-item {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
}
*/
