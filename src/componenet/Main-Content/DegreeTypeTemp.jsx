import React from "react";
import WhiteFahrenhight from "../../svg/fahrenheit-6.svg";
import BlackFahrenhight2 from "../../svg/fahrenheit-5.svg";
import WhiteCelsius from "../../svg/celsius-4.svg";
import BlackCelsius from "../../svg/celsius-5.svg";
import { useWeather } from "../../ContextData/context";

const DegreeTypeTemp = () => {

    const { unit, setUnit } = useWeather();

    const handleUnitChange = (unitType) => {
        setUnit(unitType);
    };

    return (
        <div className="flex flex-row justify-end m-4">
            <div className="mr-2">
                <img
                    src={unit === 'imperial' ? WhiteFahrenhight : BlackFahrenhight2}
                    alt=""
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => handleUnitChange('imperial')}
                />
            </div>
            <div>
                <img
                    src={unit === 'metric' ? WhiteCelsius : BlackCelsius}
                    alt=""
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => handleUnitChange('metric')}
                />
            </div>
        </div>
    )
}

export default DegreeTypeTemp;