import { create } from 'zustand';
import axios from 'axios';

const API_KEY = '8339e99d575101732774ba537501f7f3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeatherStore = create((set, get) => ({
  // State
  weather: null,
  forecast: null,
  loading: false,
  error: null,
  city: 'Moncton',
  unit: 'metric', // 'metric' for Celsius, 'imperial' for Fahrenheit
  theme: 'light', // 'light' or 'dark'
  lastRequestTime: 0, // Track last request time for rate limiting
  dialog: {
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showRetry: false
  },

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCity: (city) => set({ city }),
  setUnit: (unit) => set({ unit }),
  setTheme: (theme) => set({ theme }),
  setDialog: (dialog) => set({ dialog }),

  // Fetch current weather
  fetchWeather: async (city) => {
    try {
      set({ loading: true, error: null });
      
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: get().unit,
        },
      });

      set({ 
        weather: response.data, 
        city: response.data.name,
        loading: false 
      });
    } catch (error) {
      let errorMessage = 'Failed to fetch weather data';
      
      if (error.response?.status === 429) {
        errorMessage = 'API rate limit reached. Please wait 1-2 minutes and try again, or try a different city.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      set({ 
        error: errorMessage,
        loading: false 
      });
    }
  },

  // Fetch 5-day forecast
  fetchForecast: async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: get().unit,
        },
      });

      // Process forecast data to group by day
      const dailyForecast = response.data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      set({ forecast: dailyForecast });
    } catch (error) {
      console.error('Failed to fetch forecast:', error);
      // Don't set error for forecast failures, just log them
    }
  },

  // Fetch both weather and forecast
  fetchWeatherData: async (city) => {
    try {
      // Rate limiting: ensure at least 1 second between requests
      const now = Date.now();
      const timeSinceLastRequest = now - get().lastRequestTime;
      if (timeSinceLastRequest < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLastRequest));
      }
      
      set({ lastRequestTime: Date.now() });
      await get().fetchWeather(city);
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      await get().fetchForecast(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  // Get user location and fetch weather
  fetchUserLocation: async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      // Add delay before API call to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: get().unit,
        },
      });

      set({ 
        weather: response.data, 
        city: response.data.name,
        loading: false 
      });

      // Also fetch forecast for the detected location
      await get().fetchForecast(response.data.name);
    } catch (error) {
      let errorMessage = error.message || 'Failed to get location';
      
      if (error.response?.status === 429) {
        errorMessage = 'API rate limit reached. Please wait 1-2 minutes and try searching for a city manually.';
      }
      
      set({ 
        error: errorMessage,
        loading: false 
      });
    }
  },

  // Toggle temperature unit
  toggleUnit: () => {
    const newUnit = get().unit === 'metric' ? 'imperial' : 'metric';
    set({ unit: newUnit });
    get().fetchWeatherData(get().city);
  },

  // Toggle theme
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
  },

  // Get weather background based on conditions
  getWeatherBackground: () => {
    const weather = get().weather;
    if (!weather) return 'default';

    const condition = weather.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    if (isNight) return 'night';
    
    switch (condition) {
      case 'clear': return 'sunny';
      case 'clouds': return 'cloudy';
      case 'rain': return 'rainy';
      case 'snow': return 'snowy';
      case 'thunderstorm': return 'stormy';
      case 'drizzle': return 'rainy';
      case 'mist':
      case 'fog': return 'foggy';
      default: return 'default';
    }
  },

  // Get weather icon
  getWeatherIcon: (condition) => {
    const icons = {
      'Clear': 'sun',
      'Clouds': 'cloud',
      'Rain': 'cloud-rain',
      'Snow': 'snowflake',
      'Thunderstorm': 'zap',
      'Drizzle': 'cloud-drizzle',
      'Mist': 'cloud',
      'Fog': 'cloud',
      'Smoke': 'cloud',
      'Haze': 'cloud',
      'Dust': 'cloud',
      'Sand': 'cloud',
      'Ash': 'cloud',
      'Squall': 'wind',
      'Tornado': 'wind',
    };
    return icons[condition] || 'sun';
  },
})); 