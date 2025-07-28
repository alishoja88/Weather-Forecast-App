import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { fetchWeatherData, city } = useWeatherStore();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm.trim());
      setIsSearching(true);
      fetchWeatherData(searchTerm.trim()).finally(() => {
        setIsSearching(false);
      });
    }
  };

  return (
    <motion.div 
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="search-container">
        <div style={{ position: 'relative' }}>
          {isSearching ? (
            <Loader2 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.7)',
                animation: 'spin 1s linear infinite'
              }} 
            />
          ) : (
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.7)'
              }} 
            />
          )}
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ 
              paddingLeft: '3rem',
              paddingRight: '3rem',
              opacity: isSearching ? 0.7 : 1
            }}
            disabled={isSearching}
          />
          <button
            type="submit"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            disabled={isSearching || !searchTerm.trim()}
          >
            {isSearching ? (
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Search size={16} />
            )}
          </button>
        </div>
      </form>
      
      <motion.div 
        className="current-location"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          color: '#e2e8f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        }}
      >
        <MapPin size={16} />
        <span>{city}</span>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar; 