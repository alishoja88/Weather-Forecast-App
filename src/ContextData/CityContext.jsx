import React, { createContext, useState, useContext } from 'react';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
    const [cityName, setCityName] = useState("");

    const handleCityChange = (newCity) => {
        setCityName(newCity);
    };

    return (
        <CityContext.Provider value={{ cityName, handleCityChange, setCityName }}>
            {children}
        </CityContext.Provider>
    );
};

export const useCity = () => useContext(CityContext);
