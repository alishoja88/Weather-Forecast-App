import React from 'react';
import { motion } from 'framer-motion';

const ParticleEffect = ({ weatherType }) => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  const getParticleStyle = (weatherType, index) => {
    const baseStyle = {
      position: 'absolute',
      borderRadius: '50%',
      pointerEvents: 'none',
    };

    switch (weatherType) {
      case 'sunny':
        return {
          ...baseStyle,
          background: 'rgba(255, 255, 255, 0.3)',
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        };
      case 'rainy':
        return {
          ...baseStyle,
          background: 'rgba(255, 255, 255, 0.2)',
          width: 2,
          height: Math.random() * 20 + 10,
          left: `${Math.random() * 100}%`,
          top: '-20px',
        };
      case 'snowy':
        return {
          ...baseStyle,
          background: 'rgba(255, 255, 255, 0.8)',
          width: Math.random() * 6 + 3,
          height: Math.random() * 6 + 3,
          left: `${Math.random() * 100}%`,
          top: '-10px',
        };
      case 'cloudy':
        return {
          ...baseStyle,
          background: 'rgba(255, 255, 255, 0.1)',
          width: Math.random() * 8 + 4,
          height: Math.random() * 8 + 4,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        };
      default:
        return {
          ...baseStyle,
          background: 'rgba(255, 255, 255, 0.1)',
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        };
    }
  };

  const getAnimation = (weatherType, index) => {
    const delay = index * 0.1;
    
    switch (weatherType) {
      case 'rainy':
        return {
          y: [0, window.innerHeight + 20],
          x: [0, Math.random() * 50 - 25],
          transition: {
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay,
            ease: "linear"
          }
        };
      case 'snowy':
        return {
          y: [0, window.innerHeight + 10],
          x: [0, Math.random() * 100 - 50],
          rotate: [0, 360],
          transition: {
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay,
            ease: "linear"
          }
        };
      default:
        return {
          y: [0, -20, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.3, 0.8, 0.3],
          transition: {
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
          }
        };
    }
  };

  return (
    <div className="particles">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          style={getParticleStyle(weatherType, index)}
          animate={getAnimation(weatherType, index)}
        />
      ))}
    </div>
  );
};

export default ParticleEffect; 