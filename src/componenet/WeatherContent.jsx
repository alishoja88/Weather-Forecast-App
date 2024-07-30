import React from 'react';
import SideContent from './Side-Content/SideContent';
import MainContent from './Main-Content/MainContent';
import useWindowSize from './Service/UseWindowSize';
import CityName from './Side-Content/CityName';
import Search from './Side-Content/Search';
import CurrentTemp from './Side-Content/CurrentTemp';
import IconWeather from './Side-Content/IconWeather';
import SummaryWeather from './Side-Content/SummaryWeather';
import CurrentHighlight from './Main-Content/CurrentHighlight';
import WeekTemp from './Main-Content/WeekTemp';
import ForecastChart from './Main-Content/chartFile/ForecastChart';
import CityImage from './Side-Content/CityImage';
import MapContent from './Side-Content/MapContent';
import DegreeTypeTemp from './Main-Content/DegreeTypeTemp';
import { useCity } from '../ContextData/CityContext';




const WeatherContent = () => {
    const size = useWindowSize();
    const isMobile = size.width <= 649;

    const { cityName } = useCity();

    if (isMobile) {
        return (
            <div className="justify-between bg-gray-200 w-[90%] m-auto rounded-sm flex flex-col">
                <DegreeTypeTemp />
                <Search />
                <CityName />
                <IconWeather />
                <CurrentTemp />
                <SummaryWeather />
                <CurrentHighlight />
                <ForecastChart />
                <WeekTemp />
                <MapContent />
                <CityImage city={cityName} />
            </div>
        );
    } else {
        return (
            <div className='flex  justify-between bg-gray-200 w-[90%] m-auto rounded-sm'>
                <SideContent />
                <MainContent />
            </div>
        )
    }
}

export default WeatherContent