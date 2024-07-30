import React from 'react';
import { useWeather } from '../../ContextData/context';
import { getWeatherIcon } from '../IconMaper';
import Wind from "../../svg/wind-2-2.svg"

const SummaryWeather = () => {
    const { currentWeather } = useWeather();

    if (!currentWeather || !currentWeather.main) return <div>Loading...</div>;
    const weatherDescription = currentWeather.weather[0].description.toLowerCase();
    const weatherIcon = getWeatherIcon(weatherDescription, { width: "32px", height: "32px" });
    return (
        <div className='flex flex-col sm:flex sm:flex-row sm:justify-center sm:items-center'>
            <div className='flex flex-row mb-3 sm:mr-10 sm:flex sm:items-center'>
                <span className='mr-3'>{weatherIcon}</span>
                <span className='sm:text-[18px]'>{weatherDescription}</span>
            </div>
            <div className='flex flex-row'>
                <img src={Wind} alt="" className='w-[32px]  h-[32px] mr-3' />
                <span><strong className='text-[18px]'>Wind {Math.round(currentWeather.wind.speed)}</strong> MPH</span>
            </div>
        </div>
    )
}

export default SummaryWeather