import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

const AvailabilityBadge = () => {
    const { data } = usePortfolioData();
    if (!data) return null;

    const { availability } = data.personalInfo;
    const isAvailable = availability.isAvailable;

    return (
        <div className="fixed bottom-8 right-8 z-40 hidden md:block">
            <div
                style={{
                    background: 'rgba(5,10,15,0.92)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${isAvailable ? 'rgba(0,210,190,0.3)' : 'rgba(232,0,45,0.3)'}`,
                    borderLeft: `3px solid ${isAvailable ? '#00D2BE' : '#E8002D'}`,
                    borderRadius: '2px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                {/* Blinking status dot */}
                <div className="relative flex-shrink-0">
                    <div
                        className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'sector-live' : ''}`}
                        style={{
                            background: isAvailable ? '#00D2BE' : '#E8002D',
                            boxShadow: isAvailable ? '0 0 6px rgba(0,210,190,0.6)' : '0 0 6px rgba(232,0,45,0.6)',
                        }}
                    />
                </div>

                <div>
                    <div
                        className="text-xs font-bold text-white font-mono tracking-wider uppercase"
                    >
                        {isAvailable
                            ? (availability.statusText || 'Available for Work')
                            : (availability.busyText || 'Currently Busy')}
                    </div>
                    <div
                        className="text-[9px] font-mono tracking-widest uppercase"
                        style={{ color: isAvailable ? 'rgba(0,210,190,0.6)' : 'rgba(232,0,45,0.6)' }}
                    >
                        {isAvailable
                            ? (availability.statusSubtext || 'DRS Open')
                            : (availability.busySubtext || 'No overtake zone')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityBadge;
