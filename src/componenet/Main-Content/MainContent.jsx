import React from "react";
import DegreeTypeTemp from "./DegreeTypeTemp";
import WeekTemp from "./WeekTemp";
import CurrentHighlight from "./CurrentHighlight";
import ForecastChart from "./chartFile/ForecastChart";


const MainContent = () => {

    return (
        <div className="w-[70%] bg-gray-200 p-6">

            <DegreeTypeTemp />
            <ForecastChart />
            <h2 className="text-xl font-bold mb-4">Today's Highlights</h2>
            <CurrentHighlight />
            <h2 className="text-xl font-bold mb-4">Week Forecast</h2>
            <WeekTemp />

        </div>
    )
}

export default MainContent