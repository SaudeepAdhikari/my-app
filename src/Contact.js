import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

function Contact() {
  const form = useRef();
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setError(null);
    emailjs.sendForm(
      'service_dvxs0i8',
      'template_xytrhan',
      form.current,
      '4rIpJ1RKaBOGuKVRQ'
    )
      .then(
        (result) => {
          setPopup(true);
          setTimeout(() => setPopup(false), 3000);
          form.current.reset();
        },
        (error) => {
          setError('Failed to send message. Please try again later.');
          console.error(error.text);
        }
      );
  };

  return (
    <div className="contact-outer-container">
      <h2 className="section-title">Contact Me</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form-enhanced">
        <div className="contact-row">
          <input type="text" name="user_name" placeholder="Your Name" required className="contact-input" />
          <input type="email" name="user_email" placeholder="Your Email" required className="contact-input" />
        </div>
        <input type="text" name="subject" placeholder="Subject" className="contact-input" />
        <textarea name="message" placeholder="Your Message" required className="contact-textarea" />
        <button type="submit" className="contact-btn">Send Message</button>
      </form>
      {popup && (
        <div className="popup-success-animated">
          <div className="popup-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#14b8a6"/>
              <path d="M12 21.5L18 27.5L28 15.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="popup-message">Message sent successfully!</div>
        </div>
      )}
      {error && <div className="popup-error">{error}</div>}
      <div className="contact-info">
        <div className="contact-info-item"><span>📧</span> saudeepadhikari543@gmail.com</div>
        <div className="contact-info-item"><span>📍</span> Nepal</div>
      </div>
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
