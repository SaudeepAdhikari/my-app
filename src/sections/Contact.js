import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaBroadcastTower, FaEnvelope, FaMapMarkerAlt, FaFlag, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';

/* ── Live Radio Waveform Animation Component ── */
const RadioWaveform = () => (
  <div className="flex items-center gap-1 h-6">
    {[4, 12, 20, 8, 16, 24, 10, 18, 14, 6, 22, 10].map((h, i) => (
      <motion.div
        key={i}
        className="w-1 bg-f1Teal rounded-full"
        animate={{
          height: [h * 0.4, h, h * 0.6, h * 1.1, h * 0.4],
        }}
        transition={{
          duration: 0.8 + (i % 4) * 0.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const Contact = () => {
  const { data } = usePortfolioData();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  if (!data) return null;
  const { personalInfo, socialLinks } = data;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: 'error', message: 'Transmission aborted: please fill in all telemetry fields.' });
      setLoading(false);
      return;
    }

    try {
      const cfg = personalInfo.emailjs;
      if (!cfg?.serviceId || !cfg?.templateId || !cfg?.publicKey)
        throw new Error('EmailJS telemetry credentials missing.');

      await emailjs.send(cfg.serviceId, cfg.templateId, {
        name: form.name, user_name: form.name,
        user_email: form.email, subject: form.subject, message: form.message,
      }, cfg.publicKey);

      setStatus({ type: 'success', message: '✓ Transmission acknowledged by Pit Wall! Will respond at full throttle.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Radio static encountered. Please try email directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/5 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 font-f1 font-black italic text-[240px] text-white/[0.015] select-none pointer-events-none">
        RADIO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="f1-section-header text-center flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
              SECTOR 07
            </span>
            <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
              TEAM RADIO // OPEN COMMS CHANNEL
            </div>
          </div>
          <h2 className="f1-section-title mt-2 justify-center">
            TRANSMIT TO PIT WALL (CONTACT ME)
          </h2>
          <div className="f1-speed-strip w-48 mt-3" />
        </div>

        {/* Grid: Left Transmission Console + Right Pit Wall Details */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12">
          
          {/* ── LEFT: Comms Form Console (7 Cols) ── */}
          <div className="lg:col-span-7">
            <div className="f1-card p-6 sm:p-8 f1-cut-lg border border-white/10 bg-gradient-to-b from-[#0F1522] to-[#080B10] shadow-2xl">
              
              {/* Console Status Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-f1Green" />
                  <div className="flex flex-col">
                    <span className="font-f1 font-black italic text-xs uppercase text-white">
                      TRANSMISSION LINK: ONLINE
                    </span>
                    <span className="font-mono text-[9px] text-gray-500">
                      FREQ 452.150 MHz // ENCRYPTED
                    </span>
                  </div>
                </div>

                <RadioWaveform />
              </div>

              {/* Status Notice */}
              {status.message && (
                <div
                  className={`p-3.5 mb-6 rounded-2xs flex items-center gap-3 text-xs font-mono border ${
                    status.type === 'success'
                      ? 'bg-f1Green/10 border-f1Green/40 text-f1Green'
                      : 'bg-f1Red/10 border-f1Red/40 text-f1Red'
                  }`}
                >
                  {status.type === 'success' ? <FaCheckCircle className="text-sm shrink-0" /> : <FaExclamationCircle className="text-sm shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-hud text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">
                      PILOT CALLSIGN / YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Toto Wolff"
                      className="w-full bg-[#05070B] border border-white/15 focus:border-f1Teal focus:ring-1 focus:ring-f1Teal p-3 text-xs text-white font-mono rounded-2xs outline-none transition-all placeholder:text-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-hud text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">
                      COMMS EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. team@mercedes-f1.com"
                      className="w-full bg-[#05070B] border border-white/15 focus:border-f1Teal focus:ring-1 focus:ring-f1Teal p-3 text-xs text-white font-mono rounded-2xs outline-none transition-all placeholder:text-gray-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-hud text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">
                    TRANSMISSION SUBJECT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Project Sprint / Contract Proposal / Grand Prix Build"
                    className="w-full bg-[#05070B] border border-white/15 focus:border-f1Teal focus:ring-1 focus:ring-f1Teal p-3 text-xs text-white font-mono rounded-2xs outline-none transition-all placeholder:text-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-hud text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">
                    TRANSMISSION BRIEF / MESSAGE CONTENT *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Provide race engineering specifications, timeline, or inquiries..."
                    className="w-full bg-[#05070B] border border-white/15 focus:border-f1Teal focus:ring-1 focus:ring-f1Teal p-3 text-xs text-white font-mono rounded-2xs outline-none transition-all placeholder:text-gray-600 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-f1-primary w-full py-4 text-sm font-black italic tracking-widest disabled:opacity-50 cursor-pointer mt-2"
                >
                  <FaBroadcastTower className="text-sm" />
                  <span>{loading ? 'TRANSMITTING TO PIT WALL...' : 'TRANSMIT (SEND MESSAGE)'}</span>
                </button>
              </form>

            </div>
          </div>

          {/* ── RIGHT: Direct Pit Wall Coordinates & Status (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            <div className="f1-card p-6 f1-cut border border-white/10">
              <h3 className="font-f1 font-black italic text-xl text-white uppercase mb-4 flex items-center gap-2">
                <FaBroadcastTower className="text-f1Teal" />
                <span>PIT WALL FREQUENCIES</span>
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Email */}
                <div className="flex items-start gap-3 p-3 bg-[#05070B] border border-white/5 rounded-2xs">
                  <div className="p-2 bg-f1Teal/15 text-f1Teal rounded-2xs shrink-0 mt-0.5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">DIRECT PIT LANE DISPATCH</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-white hover:text-f1Teal font-bold transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3 bg-[#05070B] border border-white/5 rounded-2xs">
                  <div className="p-2 bg-f1Red/15 text-f1Red rounded-2xs shrink-0 mt-0.5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">GRID HOME BASE</span>
                    <strong className="text-white flex items-center gap-1.5 font-bold">
                      {personalInfo.location || 'Nepal'} 🇳🇵 // GMT +5:45
                    </strong>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3 p-3 bg-[#05070B] border border-white/5 rounded-2xs">
                  <div className="p-2 bg-f1Green/15 text-f1Green rounded-2xs shrink-0 mt-0.5">
                    <FaFlag />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">CONTRACT AVAILABILITY</span>
                    <strong className="text-f1Green font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-f1Green" />
                      AVAILABLE FOR FULL-STACK &amp; UI ENGAGEMENTS
                    </strong>
                  </div>
                </div>
              </div>

              {/* Social Channels in Cockpit Decals */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="font-hud text-[10px] text-gray-400 uppercase tracking-widest block mb-3 font-bold">
                  OFFICIAL DRIVER CHANNELS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((s) => {
                    const Icon = getIcon(s.icon);
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-[#05070B] border border-white/10 hover:border-f1Teal hover:text-f1Teal text-gray-300 font-f1 font-bold text-xs uppercase flex items-center gap-2 rounded-2xs transition-all"
                      >
                        {Icon ? Icon : null}
                        <span>{s.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* F1 Radio Transmission Card */}
            <div className="f1-card p-4 border border-f1Red/30 rounded-2xs bg-gradient-to-r from-f1Red/10 to-transparent">
              <div className="flex items-center gap-2 text-f1Red font-f1 font-black text-xs uppercase tracking-wider mb-1">
                <span>📻 "MESSAGE RECEIVED, SAUDEEP."</span>
              </div>
              <p className="font-mono text-xs text-gray-300 italic">
                Expect reply telemetry within 24 hours. Keep your visor down and telemetry clean.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
