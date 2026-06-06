import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

/**
 * Dynamically resolves a string name to a react-icons component.
 * Supports FontAwesome (Fa) and SimpleIcons (Si).
 * 
 * @param {string} iconName The name of the icon (e.g., 'FaGithub')
 * @param {object} props Props passed to the icon component (size, color, className, etc.)
 */
export const getIcon = (iconName, props = {}) => {
    if (!iconName) return null;

    // Resolve FontAwesome icons
    if (iconName.startsWith('Fa') && FaIcons[iconName]) {
        const IconComponent = FaIcons[iconName];
        return <IconComponent {...props} />;
    }

    // Resolve SimpleIcons icons
    if (iconName.startsWith('Si') && SiIcons[iconName]) {
        const IconComponent = SiIcons[iconName];
        return <IconComponent {...props} />;
    }

    // Fallback search in all imported sets
    if (FaIcons[iconName]) {
        const IconComponent = FaIcons[iconName];
        return <IconComponent {...props} />;
    }

    if (SiIcons[iconName]) {
        const IconComponent = SiIcons[iconName];
        return <IconComponent {...props} />;
    }

    return null;
};
