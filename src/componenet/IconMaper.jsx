import React from "react";
import { ReactComponent as ScatteredCloud } from "../svg/scattered_clouds2.svg";
import { ReactComponent as CloudIcon } from "../svg/cloud-78.svg";
import { ReactComponent as BrokenClouds } from "../svg/cloud-309.svg";
import { ReactComponent as FewCloud } from "../svg/few-cloud.svg";
import { ReactComponent as Rain } from "../svg/rain.svg";
import { ReactComponent as ShowerRain } from "../svg/heavy-rain.svg";
import { ReactComponent as Thunderstorm } from "../svg/weather-thunderstorm.svg";
import { ReactComponent as Snow } from "../svg/snow.svg";
import { ReactComponent as FogMist } from "../svg/fog-47.svg";
import { ReactComponent as Sunny } from "../svg/sunny-9.svg";
import { ReactComponent as ModerateRain } from "../svg/moderate-rain.svg";
import { ReactComponent as HeavyRain } from "../svg/heavy-rain-2.svg";
import { ReactComponent as FreezingRain } from "../svg/freezing-rain-6.svg";
import { ReactComponent as OvercastCloud } from "../svg/overcast-36.svg";
import { ReactComponent as Humidity } from "../svg/humidity-22.svg";
import { ReactComponent as Sunrise } from "../svg/sunrise-28.svg";
import { ReactComponent as Sunset } from "../svg/sunset-27.svg";
import { ReactComponent as Visibility } from "../svg/visibility-5.svg";
import { ReactComponent as FeelsLike } from "../svg/temperature-32.svg";



export const getWeatherIcon = (weatherDescription, style) => {
    switch (weatherDescription) {
        case "scattered clouds":
            return <ScatteredCloud style={style} />
        case "clear sky":
            return <CloudIcon style={style} />
        case "broken clouds":
            return <BrokenClouds style={style} />
        case "few clouds":
            return <FewCloud style={style} />
        case "rain":
        case "light rain":
        case "light intensity shower rain":
            return <Rain style={style} />
        case "moderate rain":
            return <ModerateRain style={style} />
        case "shower rain":
            return <ShowerRain style={style} />
        case "heavy rain":
        case "very heavy rain":
        case "extreme rain":
            return <HeavyRain style={style} />
        case "freezing rain":
            return <FreezingRain style={style} />
        case "thunderstorm":
        case "thunderstorm with light rain":
        case "thunderstorm with rain":
        case "thunderstorm with heavy rain":
        case "light thunderstorm":
        case "heavy thunderstorm":
        case "ragged thunderstorm":
        case "thunderstorm with light drizzle":
        case "thunderstorm with drizzle":
        case "thunderstorm with heavy drizzle":
            return <Thunderstorm style={style} />
        case "snow":
        case "light snow":
        case "heavy snow":
        case "sleet":
        case "light shower sleet":
            return <Snow style={style} />
        case "mist":
            return <FogMist style={style} />
        case "sun":
            return <Sunny style={style} />
        case "overcast clouds":
            return <OvercastCloud style={style} />
        case "humidity":
            return <Humidity style={style} />
        case "sunrise":
            return <Sunrise style={style} />
        case "sunset":
            return <Sunset style={style} />
        case "visibility":
            return <Visibility style={style} />
        case "feelsLike":
            return <FeelsLike style={style} />
        default:
            return <Sunny style={style} />;
    }
}



