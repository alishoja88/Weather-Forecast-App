import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="weather-bg default">
      <div className="loading-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              y: [0, -20, 0]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ marginBottom: '2rem' }}
          >
            <Cloud size={80} color="white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              color: 'white', 
              fontSize: '1.5rem',
              marginBottom: '1rem'
            }}
          >
            Loading Weather Data
          </motion.h2>
          
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 