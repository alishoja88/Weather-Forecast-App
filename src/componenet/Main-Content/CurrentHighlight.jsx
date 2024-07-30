import React from 'react';
import { useWeather } from '../../ContextData/context';
import moment from "moment-timezone";
import tz_lookup from 'tz-lookup';
import { getWeatherIcon } from '../IconMaper';


const CurrentHighlight = () => {
    const { currentWeather, unit } = useWeather();

    if (!currentWeather) return null;

    const { main, sys, visibility, coord } = currentWeather;
    const feelsLike = main ? main.feels_like : null;
    const humidity = main ? main.humidity : null;
    const visibilityInKm = visibility ? visibility / 1000 : null;

    const timeZoneName = tz_lookup(coord.lat, coord.lon)
    const sunrise = sys ? moment.unix(sys.sunrise).tz(timeZoneName).format('hh:mm A') : null;
    const sunset = sys ? moment.unix(sys.sunset).tz(timeZoneName).format('hh:mm A') : null;

    const iconStyle = { width: '50px', height: '50px', marginLeft: '10px' };

    const tempIconDeg = unit === "metric" ? "°C" : "°F";

    return (
        <div className="p-6 mt-6 bg-[#97d48f] pt-5 rounded-sm mb-[50px] sm:w-[95%] sm:m-auto sm:mt-4 sm:mb-5">
            <div className="space-y-4 flex flex-row justify-between sm:flex sm:flex-wrap sm:justify-evenly">
                <div className="flex flex-col rounded-sm border-2 border-gray-4 p-6 mt-4 bg-white">
                    {getWeatherIcon("feelslike", iconStyle)}
                    <strong className="block text-gray-700">Feels Like:</strong> {Math.round(feelsLike)} {tempIconDeg}
                </div>
                <div className="flex flex-col rounded-sm border-2 border-gray-4 p-6 mb-4 bg-white">
                    {getWeatherIcon("humidity", iconStyle)}
                    <strong className="block text-gray-700">Humidity:</strong> {humidity} %
                </div>
                <div className="flex flex-col rounded-sm border-2 border-gray-4 p-6 mb-4 bg-white">
                    {getWeatherIcon("sunrise", iconStyle)}
                    <strong className="block text-gray-700">Sunrise:</strong> {sunrise}
                </div>
                <div className="flex flex-col rounded-sm border-2 border-gray-4 p-6 mb-4 bg-white">
                    {getWeatherIcon("sunset", iconStyle)}
                    <strong className="block text-gray-700">Sunset:</strong> {sunset}
                </div>
                <div className="flex flex-col rounded-sm border-2 border-gray-4 p-6 mb-4 bg-white">
                    {getWeatherIcon("visibility", iconStyle)}
                    <strong className="block text-gray-700">Visibility:</strong> {visibilityInKm} km
                </div>
            </div>
        </div>
    )
}

export default CurrentHighlight