import React from "react";
import { useWeather } from "../../ContextData/context";
import { getWeatherIcon } from "../IconMaper";


const IconWeather = () => {
    const { currentWeather } = useWeather();

    if (!currentWeather || !currentWeather.weather || currentWeather.weather.length === 0) {
        return null;
    }
    const weatherIcone = getWeatherIcon(currentWeather.weather[0].description.toLowerCase(), { width: '150px', height: '150px' });

    return (
        <div className="w-1/2 sm:w-[100%] flex sm:items-center sm:flex sm:justify-center">
            {weatherIcone}
        </div>
    );
}

export default IconWeather;

