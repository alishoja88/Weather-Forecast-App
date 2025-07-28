import React from 'react';
import { motion } from 'framer-motion';

const WeatherCard = ({ 
  icon, 
  label, 
  value, 
  description = null, 
  onClick = null,
  className = "",
  iconSize = "2rem",
  labelSize = "0.9rem",
  valueSize = "1.2rem"
}) => {
  const cardContent = (
    <div className={`weather-card ${className}`}>
      {/* Icon */}
      <div 
        className="weather-card-icon"
        style={{ fontSize: iconSize }}
      >
        {icon}
      </div>
      
      {/* Label */}
      <div 
        className="weather-card-label"
        style={{ fontSize: labelSize }}
      >
        {label}
      </div>
      
      {/* Value */}
      <div 
        className="weather-card-value"
        style={{ fontSize: valueSize }}
      >
        {value}
      </div>
      
      {/* Optional Description */}
      {description && (
        <div className="weather-card-description">
          {description}
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default WeatherCard; 