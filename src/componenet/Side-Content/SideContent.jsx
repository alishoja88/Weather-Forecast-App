import React from 'react'
import Search from './Search';
import CurrentTemp from './CurrentTemp';
import IconWeather from './IconWeather';
import SummaryWeather from './SummaryWeather';
import CityName from './CityName';
import CityImage from './CityImage';
import { useCity } from '../../ContextData/CityContext';
import MapContent from './MapContent';


const SideContent = () => {

    const { cityName } = useCity();
    return (
        <div className='flex flex-col w-[30%] p-6 bg-slate-200 border-2 sm:w-[100%] md:w-[100%] items-center' >
            <Search />
            <CityName />
            <IconWeather />
            <CurrentTemp />
            <SummaryWeather />
            {cityName && <CityImage city={cityName} />}
            <MapContent />
        </div>
    )
}

export default SideContent