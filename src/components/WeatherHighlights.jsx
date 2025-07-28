import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Sunrise, 
  Sunset, 
  Eye,
  Wind
} from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import WeatherCard from './WeatherCard';

const WeatherHighlights = () => {
  const { weather, unit } = useWeatherStore();

  if (!weather) return null;

  const { main, sys, visibility, wind } = weather;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatVisibility = (visibility) => {
    return unit === 'metric' 
      ? `${(visibility / 1000).toFixed(1)} km`
      : `${(visibility / 1609.344).toFixed(1)} mi`;
  };

  const formatWindSpeed = (speed) => {
    return unit === 'metric' 
      ? `${speed} m/s`
      : `${(speed * 2.237).toFixed(1)} mph`;
  };

  const highlights = [
    {
      icon: <Thermometer size={32} style={{ color: '#ff6b6b' }} />,
      label: 'Feels Like',
      value: `${Math.round(main.feels_like)}°${unit === 'metric' ? 'C' : 'F'}`
    },
    {
      icon: <Droplets size={32} style={{ color: '#4ecdc4' }} />,
      label: 'Humidity',
      value: `${main.humidity}%`
    },
    {
      icon: <Sunrise size={32} style={{ color: '#ffd93d' }} />,
      label: 'Sunrise',
      value: formatTime(sys.sunrise)
    },
    {
      icon: <Sunset size={32} style={{ color: '#ff8e53' }} />,
      label: 'Sunset',
      value: formatTime(sys.sunset)
    },
    {
      icon: <Eye size={32} style={{ color: '#6c5ce7' }} />,
      label: 'Visibility',
      value: formatVisibility(visibility)
    },
    {
      icon: <Wind size={32} style={{ color: '#a8e6cf' }} />,
      label: 'Wind Speed',
      value: formatWindSpeed(wind.speed)
    }
  ];

  return (
    <motion.div 
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="chart-title">Today's Highlights</h2>
      
      <div className="highlights-grid">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 100
            }}
          >
            <WeatherCard
              icon={highlight.icon}
              label={highlight.label}
              value={highlight.value}
              iconSize="3rem"
              labelSize="0.9rem"
              valueSize="1.2rem"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherHighlights; 