import React from 'react';
import { motion } from 'framer-motion';
import { useWeatherStore } from '../store/weatherStore';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import WeatherHighlights from './WeatherHighlights';

import WeekForecast from './WeekForecast';
import ThemeToggle from './ThemeToggle';
import LoadingSpinner from './LoadingSpinner';
import ParticleEffect from './ParticleEffect';

import TemperatureChart from './TemperatureChart';
import SunriseChart from './SunriseChart';
import DialogMessage from './DialogMessage';

const ModernWeatherApp = () => {
  const { 
    loading, 
    error, 
    theme, 
    getWeatherBackground,
    dialog,
    setDialog,
    fetchWeatherData,
    city
  } = useWeatherStore();

  const weatherBackground = getWeatherBackground();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    
    return (
      <div className="weather-bg default">
        <div className="modern-container">
          <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#1a202c', marginBottom: '1rem' }}>Error</h2>
            <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>{error}</p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setDialog({
                    isOpen: true,
                    title: 'Error Details',
                    message: error,
                    type: 'error',
                    showRetry: true
                  });
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                View Details
              </button>
              
              <button
                onClick={() => {
                  // Clear error and try to fetch default city
                  useWeatherStore.getState().setError(null);
                  fetchWeatherData(city);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#38a169',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Try Default City
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-bg ${weatherBackground} ${theme}`}>
      <ParticleEffect weatherType={weatherBackground} />
      
      <ThemeToggle />
      
      <motion.div 
        className="modern-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Sidebar */}
        <motion.div 
          className="sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar />
          <CurrentWeather />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="main-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <WeatherHighlights />
          <TemperatureChart />
          <SunriseChart />
          <WeekForecast />
        </motion.div>
      </motion.div>
      
      {/* Dialog */}
      <DialogMessage
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        showRetry={dialog.showRetry}
        onRetry={() => {
          // Retry logic here
          setDialog({ ...dialog, isOpen: false });
        }}
      />
    </div>
  );
};

export default ModernWeatherApp; 