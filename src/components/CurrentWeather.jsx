import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle
} from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

const CurrentWeather = () => {
  const { weather, unit, toggleUnit } = useWeatherStore();

  if (!weather) return null;

  const { main, weather: weatherInfo, name, dt, timezone } = weather;
  const weatherCondition = weatherInfo[0].main;
  const description = weatherInfo[0].description;

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const iconProps = { size: 64, color: 'white' };
    
    switch (condition) {
      case 'Clear':
        return <Sun {...iconProps} />;
      case 'Clouds':
        return <Cloud {...iconProps} />;
      case 'Rain':
        return <CloudRain {...iconProps} />;
      case 'Snow':
        return <CloudSnow {...iconProps} />;
      case 'Thunderstorm':
        return <Zap {...iconProps} />;
      case 'Drizzle':
        return <CloudDrizzle {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  const formatDate = () => {
    // Get current UTC time and apply city's timezone offset
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utcTime + (timezone * 1000));
    
    const options = { 
      weekday: 'long', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    };
    
    return cityTime.toLocaleDateString('en-US', options);
  };

  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);

  return (
    <motion.div 
      className="glass-card temperature-display"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* City Name */}
      <div className="city-name">{name}</div>

      {/* Date and Time */}
      <div style={{ 
        color: '#4a5568', 
        fontSize: '1rem',
        marginBottom: '1rem',
        fontWeight: '500'
      }}>
        {formatDate()}
      </div>

      {/* Weather Icon - Centered */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        margin: '2rem 0',
        minHeight: '80px'
      }}>
        <motion.div
          className="weather-icon"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          {getWeatherIcon(weatherCondition)}
        </motion.div>
      </div>

      {/* Temperature */}
      <div className="current-temp">
        {temperature}°{unit === 'metric' ? 'C' : 'F'}
      </div>

      {/* Weather Description */}
      <div className="weather-description">{description}</div>

      {/* Feels Like */}
      <div style={{ 
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        color: '#1a202c',
        fontWeight: '500'
      }}>
        Feels like {feelsLike}°{unit === 'metric' ? 'C' : 'F'}
      </div>

      {/* Unit Toggle */}
      <div className="unit-toggle" style={{ marginTop: '1rem' }}>
        <button
          className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
          onClick={() => toggleUnit()}
        >
          °C
        </button>
        <button
          className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
          onClick={() => toggleUnit()}
        >
          °F
        </button>
      </div>
    </motion.div>
  );
};

export default CurrentWeather; 