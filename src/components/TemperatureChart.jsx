import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  Moon
} from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

const TemperatureChart = () => {
  const { forecast, unit } = useWeatherStore();

  if (!forecast) return null;

  // Get forecast data - try today first, then first available day
  const today = new Date().toDateString();
  let forecastData = forecast[today];
  
  if (!forecastData || forecastData.length === 0) {
    const firstDay = Object.keys(forecast)[0];
    if (!firstDay) return null;
    forecastData = forecast[firstDay];
    if (!forecastData || forecastData.length === 0) return null;
  }

  // Process data for chart - take first 12 entries for better hourly view
  const chartData = forecastData.slice(0, 12).map((item, index) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    const isNight = hour < 6 || hour > 18;
    
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        hour12: true 
      }),
      hour: hour,
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind?.speed || 0),
      condition: item.weather[0].main,
      isNight: isNight
    };
  });

  // Get weather icon based on condition and time
  const getWeatherIcon = (condition, isNight) => {
    const iconProps = { size: 24, color: isNight ? '#fbbf24' : '#f59e0b' };
    
    switch (condition) {
      case 'Clear':
        return isNight ? <Moon {...iconProps} /> : <Sun {...iconProps} />;
      case 'Clouds':
        return <Cloud {...iconProps} size={24} color="#94a3b8" />;
      case 'Rain':
        return <CloudRain {...iconProps} size={24} color="#60a5fa" />;
      case 'Snow':
        return <CloudSnow {...iconProps} size={24} color="#a5b4fc" />;
      case 'Thunderstorm':
        return <Zap {...iconProps} size={24} color="#fbbf24" />;
      case 'Drizzle':
        return <CloudDrizzle {...iconProps} size={24} color="#60a5fa" />;
      default:
        return isNight ? <Moon {...iconProps} /> : <Sun {...iconProps} />;
    }
  };

  // Get daily summary
  const getDailySummary = () => {
    const maxTemp = Math.max(...chartData.map(d => d.temp));
    const minTemp = Math.min(...chartData.map(d => d.temp));
    const conditions = chartData.map(d => d.condition);
    const mostCommonCondition = conditions.sort((a,b) => 
      conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
    ).pop();
    
    return `${mostCommonCondition.toLowerCase()}. Highs in the upper ${maxTemp}s and lows in the low ${minTemp}s.`;
  };

  // Create custom SVG chart
  const createCustomChart = () => {
    const width = 800;
    const height = 120;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const temps = chartData.map(d => d.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = maxTemp - minTemp || 1;
    
    const points = chartData.map((d, i) => {
      const x = padding + (i / (chartData.length - 1)) * chartWidth;
      const y = padding + ((maxTemp - d.temp) / tempRange) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Temperature line */}
        <polyline
          fill="none"
          stroke="#fbbf24"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        
        {/* Data points */}
        {chartData.map((d, i) => {
          const x = padding + (i / (chartData.length - 1)) * chartWidth;
          const y = padding + ((maxTemp - d.temp) / tempRange) * chartHeight;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#fbbf24"
              stroke="#ffffff"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <motion.div 
      className="glass-card"
      style={{ padding: '2rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Daily Summary */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: '#e2e8f0',
        fontSize: '1rem',
        lineHeight: '1.5'
      }}>
        {getDailySummary()}
      </div>

      {/* Hourly Forecast */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          color: '#e2e8f0', 
          marginBottom: '1.5rem', 
          fontSize: '1.2rem',
          fontWeight: '600'
        }}>
          Hourly Forecast
        </h3>
        
        {/* Time Labels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${chartData.length}, 1fr)`,
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {chartData.map((item, index) => (
            <div key={index} style={{
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {item.time}
            </div>
          ))}
        </div>

        {/* Weather Icons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${chartData.length}, 1fr)`,
          gap: '0.5rem',
          marginBottom: '1rem',
          alignItems: 'center'
        }}>
          {chartData.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {getWeatherIcon(item.condition, item.isNight)}
            </div>
          ))}
        </div>

        {/* Custom Temperature Chart */}
        <div style={{
          marginBottom: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '1rem',
          overflow: 'hidden'
        }}>
          {createCustomChart()}
        </div>

        {/* Temperatures */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${chartData.length}, 1fr)`,
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {chartData.map((item, index) => (
            <div key={index} style={{
              textAlign: 'center',
              color: '#e2e8f0',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              {item.temp}°
            </div>
          ))}
        </div>

        {/* Humidity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${chartData.length}, 1fr)`,
          gap: '0.5rem'
        }}>
          {chartData.map((item, index) => (
            <div key={index} style={{
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem'
            }}>
              <span style={{ fontSize: '0.7rem' }}>💧</span>
              {item.humidity}%
            </div>
          ))}
        </div>
      </div>

      {/* Additional stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            Max Temp
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fbbf24' }}>
            {Math.max(...chartData.map(d => d.temp))}°{unit === 'metric' ? 'C' : 'F'}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            Min Temp
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#60a5fa' }}>
            {Math.min(...chartData.map(d => d.temp))}°{unit === 'metric' ? 'C' : 'F'}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            Avg Humidity
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#34d399' }}>
            {Math.round(chartData.reduce((sum, d) => sum + d.humidity, 0) / chartData.length)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemperatureChart; 