import React, { useState, useEffect } from 'react';
import { FaCloudSun, FaThermometerHalf, FaFlag } from 'react-icons/fa';

const TrackWeatherWidget = () => {
  const [localTime, setLocalTime] = useState('');
  const [trackTemp] = useState('28.4°C');
  const [airTemp] = useState('22.1°C');
  const [trackCondition] = useState('DRY // OPTIMAL');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setLocalTime(formatted);
      } catch (e) {
        // Fallback GMT+5:45
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nepTime = new Date(utc + (3600000 * 5.75));
        setLocalTime(nepTime.toTimeString().split(' ')[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
      {/* Kathmandu Track Time */}
      <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-2xs border border-white/10">
        <span className="text-gray-500 font-bold">KTM TRACK TIME:</span>
        <span className="text-white font-bold">{localTime || '18:30:00'} (GMT +5:45)</span>
      </div>

      {/* Track Surface & Air Telemetry */}
      <div className="hidden xl:flex items-center gap-2 text-gray-300">
        <span className="flex items-center gap-1 text-yellow-400">
          <FaThermometerHalf className="text-[10px]" />
          <span>TRACK: <strong className="text-white">{trackTemp}</strong></span>
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1 text-f1Teal">
          <FaCloudSun className="text-[10px]" />
          <span>AIR: <strong className="text-white">{airTemp}</strong></span>
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1 text-f1Green font-bold">
          <FaFlag className="text-[9px]" />
          <span>{trackCondition}</span>
        </span>
      </div>
    </div>
  );
};

export default TrackWeatherWidget;

