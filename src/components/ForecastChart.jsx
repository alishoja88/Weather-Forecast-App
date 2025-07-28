import React from 'react';
import { motion } from 'framer-motion';
import { useWeatherStore } from '../store/weatherStore';

const ForecastChart = () => {
  const { forecast, unit } = useWeatherStore();

  if (!forecast) return null;

  // Get today's forecast data
  const today = new Date().toDateString();
  const todayForecast = forecast[today];

  if (!todayForecast) return null;

  // Process data for chart
  const chartData = todayForecast.slice(0, 8).map((item, index) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main
  }));

  const maxTemp = Math.max(...chartData.map(d => d.temp));
  const minTemp = Math.min(...chartData.map(d => d.temp));
  const tempRange = maxTemp - minTemp;

  return (
    <motion.div 
      className="glass-card forecast-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="chart-title">24-Hour Temperature Forecast</h2>
      
      <div style={{ 
        position: 'relative', 
        height: '200px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '1rem 0'
      }}>
        {chartData.map((data, index) => {
          const height = tempRange > 0 
            ? ((data.temp - minTemp) / tempRange) * 150 + 50
            : 100;
          
          return (
            <motion.div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Temperature */}
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#1a202c'
              }}>
                {data.temp}°{unit === 'metric' ? 'C' : 'F'}
              </div>
              
              {/* Bar */}
              <motion.div
                style={{
                  width: '30px',
                  background: 'linear-gradient(180deg, #4ecdc4 0%, #44a08d 100%)',
                  borderRadius: '15px 15px 0 0',
                  position: 'relative'
                }}
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              />
              
              {/* Time */}
              <div style={{
                fontSize: '0.8rem',
                color: '#4a5568',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {data.time}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(180deg, #4ecdc4 0%, #44a08d 100%)',
            borderRadius: '50%'
          }} />
          <span style={{ color: '#1a202c', fontSize: '0.9rem', fontWeight: '500' }}>Temperature</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ForecastChart; 