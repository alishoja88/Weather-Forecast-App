import React, { useEffect } from 'react';
import './styles/modern.css';
import { useWeatherStore } from './store/weatherStore';
import ModernWeatherApp from './components/ModernWeatherApp';

function App() {
  const { fetchWeatherData, fetchUserLocation, city, weather } = useWeatherStore();

  useEffect(() => {
    // Only initialize once when the app starts
    const initializeApp = async () => {
      try {
        // Only try to get location if we don't have weather data
        if (!weather) {
          await fetchUserLocation();
        }
      } catch (error) {
        // If location fails, use default city only if no weather data exists
        if (!weather) {
          console.log('Location detection failed, using default city:', city);
          fetchWeatherData(city);
        }
      }
    };
    
    initializeApp();
  }, []); // Empty dependency array - only run once on mount

  return <ModernWeatherApp />;
}

export default App;
