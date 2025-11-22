import React from 'react';
import { motion } from 'framer-motion';

const AvailabilityBadge = () => {
    const isAvailable = true; // Change this based on your availability

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-8 right-8 z-40 hidden md:block"
        >
            <div className={`glass-panel px-6 py-3 flex items-center gap-3 ${isAvailable ? 'border-green-500/50' : 'border-red-500/50'
                }`}>
                {/* Pulse indicator */}
                <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                    {isAvailable && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                    )}
                </div>

                {/* Status text */}
                <div>
                    <div className="text-sm font-semibold text-white">
                        {isAvailable ? 'Available for Work' : 'Currently Busy'}
                    </div>
                    <div className="text-xs text-gray-400">
                        {isAvailable ? 'Open to opportunities' : 'Check back later'}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AvailabilityBadge;
