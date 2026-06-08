import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

const AvailabilityBadge = () => {
    const { data } = usePortfolioData();

    if (!data) return null;

    const { availability } = data.personalInfo;
    const isAvailable = availability.isAvailable;

    return (
        <div className="fixed bottom-8 right-8 z-40 hidden md:block">
            <div className={`glass-panel px-6 py-3 flex items-center gap-3 ${isAvailable ? 'border-green-500/50' : 'border-red-500/50'
                }`}>
                <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                </div>

                <div>
                    <div className="text-sm font-semibold text-white">
                        {isAvailable 
                            ? (availability.statusText || 'Available for Work') 
                            : (availability.busyText || 'Currently Busy')}
                    </div>
                    <div className="text-xs text-gray-400">
                        {isAvailable 
                            ? (availability.statusSubtext || 'Open to opportunities') 
                            : (availability.busySubtext || 'Check back later')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityBadge;
