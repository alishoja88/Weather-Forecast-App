import React from 'react';
import { useWeather } from '../../ContextData/context';
import moment from 'moment-timezone';

const CurrentTemp = () => {
    const { currentWeather, loading, unit } = useWeather();

    const renderHour = () => {
        if (!currentWeather) return null;

        const timezone = currentWeather.timezone;
        const localTime = moment().utcOffset(timezone / 60).format('dddd, h A');

        return <span>{localTime}</span>;
    };

    if (loading) return <div>Loading...</div>;
    if (!currentWeather || !currentWeather.main) return <div>Loading...</div>;

    const tempIconDeg = unit === "metric" ? "°C" : "°F";

    return (
        <div className='flex flex-col items-center w-[100%] mb-4 sm:flex sm:flex-row sm:items-end sm:justify-center '>
            <div className='mb-3'>
                <h1 className='text-[60px] sm:mr-8'>{Math.round(currentWeather.main.temp)}{tempIconDeg}</h1>
            </div>
            <span className='text-base font-medium sm:mb-6'>{renderHour()}</span>
        </div>
    );
};

export default CurrentTemp;
