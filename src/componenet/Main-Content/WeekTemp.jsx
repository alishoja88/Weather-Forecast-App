import React, { useContext } from 'react';
import { format, parseISO } from 'date-fns';
import { APIContext } from '../../ContextData/context';
import { getWeatherIcon } from '../IconMaper';

const WeekTemp = () => {
    const { forecastWeather, loading, unit } = useContext(APIContext);

    if (loading) return <div>Loading...</div>;
    if (!forecastWeather || !forecastWeather.list) return <div>No forecast data available.</div>;

    const getDayName = (date) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = date.getDay();
        return dayNames[dayIndex];
    };

    const getDayData = (date, forecastData) => {
        const dateString = format(date, 'yyyy-MM-dd');
        const dayData = forecastData.list.filter(entry => format(parseISO(entry.dt_txt), 'yyyy-MM-dd') === dateString);
        if (dayData.length === 0) {
            return null;
        }
        const maxTemp = Math.max(...dayData.map(entry => Math.round(entry.main.temp_max)));
        const minTemp = Math.min(...dayData.map(entry => Math.round(entry.main.temp_min)));
        const weatherDescription = dayData[0].weather[0].description;
        return {
            date: date,
            maxTemp: maxTemp,
            minTemp: minTemp,
            weatherDescription: weatherDescription
        };
    };

    const forecastDays = forecastWeather.list.reduce((acc, entry) => {
        const date = parseISO(entry.dt_txt.split(' ')[0]);
        const dayName = getDayName(date);
        if (!acc[dayName]) {
            acc[dayName] = getDayData(date, forecastWeather);
        }
        return acc;
    }, {});

    const tempIconDeg = unit === "metric" ? "°C" : "°F";

    return (
        <div className='flex flex-row justify-around bg-[#c3dc6d] pt-5 rounded-sm sm:w-[95%] m-auto sm:flex sm:flex-wrap sm:justify-evenly sm:gap-11 sm:gap-y-5 sm:p-3 mb-3'>
            {Object.keys(forecastDays).map((dayName, index) => {
                const dayData = forecastDays[dayName];
                if (!dayData) return null;
                const weatherIcon = getWeatherIcon(dayData.weatherDescription.toLowerCase(), { width: '50px', height: '50px' }); // Use the weather description to get the icon
                return (

                    <div key={index} className="flex flex-col rounded-sm border-2 border-gray-4 p-4 mb-4 bg-white">
                        <div className="flex justify-center">
                            <span>{dayName}</span>
                        </div>
                        <div className="mt-2">
                            <span>{weatherIcon}</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                            <span> {dayData.maxTemp} {tempIconDeg}</span>
                            <span className='text-gray-400'> {dayData.minTemp} {tempIconDeg}</span>
                        </div>
                    </div>



                );
            })}
        </div>
    );
};

export default WeekTemp;
