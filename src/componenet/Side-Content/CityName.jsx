import React from 'react';
import { useWeather } from '../../ContextData/context';

const CityName = () => {
    const { cityName } = useWeather()
    const city = cityName.charAt(0).toUpperCase() + cityName.slice(1)
    return (
        <div className='sm:flex  sm:justify-center'>
            <h2 className='text-[24px] font-bold '>
                {city}
            </h2>
        </div>
    )
}

export default CityName;