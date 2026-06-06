import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/portfolioData.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch portfolio data');
                }
                return response.json();
            })
            .then((jsonData) => {
                setData(jsonData);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching portfolio data:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <PortfolioDataContext.Provider value={{ data, loading, error }}>
            {children}
        </PortfolioDataContext.Provider>
    );
};

export const usePortfolioData = () => {
    const context = useContext(PortfolioDataContext);
    if (context === undefined) {
        throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
    }
    return context;
};
