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
import WeatherCard from './WeatherCard';

const WeekForecast = () => {
  const { forecast, unit } = useWeatherStore();

  if (!forecast) return null;

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const iconProps = { size: 32, color: '#4ecdc4' };
    
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

  // Process forecast data for week view
  const weekData = Object.entries(forecast).slice(0, 7).map(([date, data]) => {
    const dayData = data[Math.floor(data.length / 2)]; // Get midday data
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      day: dayName,
      temp: Math.round(dayData.main.temp),
      condition: dayData.weather[0].main,
      description: dayData.weather[0].description
    };
  });

  return (
    <motion.div 
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h2 className="chart-title">Week Forecast</h2>
      
      <div className="week-forecast">
        {weekData.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            <WeatherCard
              icon={getWeatherIcon(day.condition)}
              label={day.day}
              value={`${day.temp}°${unit === 'metric' ? 'C' : 'F'}`}
              description={day.description}
              iconSize="3rem"
              labelSize="1.1rem"
              valueSize="1.4rem"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeekForecast; 