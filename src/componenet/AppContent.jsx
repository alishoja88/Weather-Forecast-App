import React from 'react';
import { useWeather } from '../ContextData/context';
import WeatherContent from './WeatherContent';
import { ThreeDots } from "react-loader-spinner";

const AppContent = () => {
    const { loading } = useWeather();

    return (
        <div className="App bg-gray-300 h-[100%] p-[30px]">
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ThreeDots
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </div>
            ) : (
                <WeatherContent />
            )}
        </div>
    );
};

export default AppContent;
