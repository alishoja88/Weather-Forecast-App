import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Sunrise, Sunset } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

const SunriseChart = () => {
  const { forecast } = useWeatherStore();

  if (!forecast) return null;

  // Process forecast data for sunrise/sunset
  const sunriseData = Object.entries(forecast).slice(0, 5).map(([date, data]) => {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    
    // Mock sunrise/sunset times (in real app, this would come from API)
    const sunriseTime = new Date(date);
    sunriseTime.setHours(6, 0, 0, 0); // 6 AM
    
    const sunsetTime = new Date(date);
    sunsetTime.setHours(18, 0, 0, 0); // 6 PM
    
    return {
      day: dayName,
      sunrise: sunriseTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      sunset: sunsetTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      sunriseHour: sunriseTime.getHours() + sunriseTime.getMinutes() / 60,
      sunsetHour: sunsetTime.getHours() + sunsetTime.getMinutes() / 60
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#1a202c' }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '4px 0', 
              color: '#4a5568',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%',
                backgroundColor: entry.color 
              }} />
              {entry.name}: <span style={{ fontWeight: 'bold' }}>{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="glass-card"
      style={{ padding: '2rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <Sunrise size={24} style={{ color: '#f6ad55' }} />
        <h2 className="chart-title" style={{ margin: 0 }}>Sunrise & Sunset Times</h2>
        <Sunset size={24} style={{ color: '#ed8936' }} />
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sunriseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          
          <XAxis 
            dataKey="day" 
            stroke="#4a5568"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis 
            stroke="#4a5568"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const hour = Math.floor(value);
              const minute = Math.round((value - hour) * 60);
              return `${hour}:${minute.toString().padStart(2, '0')}`;
            }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="sunriseHour"
            name="Sunrise"
            stroke="#f6ad55"
            strokeWidth={3}
            dot={{ fill: '#f6ad55', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#f6ad55', strokeWidth: 2 }}
          />
          
          <Line
            type="monotone"
            dataKey="sunsetHour"
            name="Sunset"
            stroke="#ed8936"
            strokeWidth={3}
            dot={{ fill: '#ed8936', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ed8936', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Day length info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px'
      }}>
        {sunriseData.map((day, index) => {
          const dayLength = day.sunsetHour - day.sunriseHour;
          const hours = Math.floor(dayLength);
          const minutes = Math.round((dayLength - hours) * 60);
          
          return (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '0.25rem' }}>
                {day.day}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#f6ad55', marginBottom: '0.25rem' }}>
                ↑ {day.sunrise}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#ed8936', marginBottom: '0.25rem' }}>
                ↓ {day.sunset}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1a202c' }}>
                {hours}h {minutes}m
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SunriseChart; 