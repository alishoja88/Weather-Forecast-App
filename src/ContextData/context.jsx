import React, { createContext, useContext, useEffect, useState } from "react";
import { useCity } from "./CityContext";

export const APIContext = createContext();
const API_KEY = '8339e99d575101732774ba537501f7f3';

export const ContextProvider = ({ children }) => {
    const { cityName, setCityName } = useCity();
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState("metric");
    const [initialLoading, setInitialLoading] = useState(true);
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);


    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!cityName) {
                setInitialLoading(false);
                return;
            }

            setLoading(true);
            try {
                const currentWeatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
                );

                const forecastWeatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
                );

                if (!currentWeatherResponse.ok || !forecastWeatherResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const currentWeatherResult = await currentWeatherResponse.json();
                const forecastWeatherResult = await forecastWeatherResponse.json();

                setCurrentWeather({
                    ...currentWeatherResult,
                    timezone: currentWeatherResult.timezone,
                    coord: currentWeatherResult.coord
                });

                setForecastWeather(forecastWeatherResult);

                setError(null);
            } catch (error) {
                if (isSearchTriggered) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [cityName, isSearchTriggered, unit]);

    useEffect(() => {
        const fetchUserLocation = () => {
            if (!navigator.geolocation) {
                setError(new Error("Geolocation is not supported by your browser"));
                setInitialLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const locationResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );

                if (locationResponse.ok) {
                    const locationData = await locationResponse.json();
                    setCityName(locationData.name);
                    setInitialLoading(false);
                } else {
                    setError(new Error("Unable to fetch location data"));
                    setInitialLoading(false);
                }
            }, () => {
                setError(new Error("Unable to retrieve your location"));
                setInitialLoading(false);
            });
        };

        if (!cityName) {
            fetchUserLocation();
        }
    }, [cityName, setCityName]);

    return (
        <APIContext.Provider value={{
            currentWeather,
            forecastWeather,
            loading,
            initialLoading,
            error,
            cityName,
            unit,
            setUnit,
            setIsSearchTriggered,
            isSearchTriggered
        }}>
            {children}
        </APIContext.Provider>
    );
};

export const useWeather = () => useContext(APIContext);
