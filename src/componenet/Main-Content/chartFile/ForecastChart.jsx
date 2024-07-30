import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useWeather } from '../../../ContextData/context';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Customized
} from 'recharts';
import { getWeatherIcon } from '../../IconMaper';

const ForecastChart = () => {
    const { forecastWeather } = useWeather();
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        if (forecastWeather && forecastWeather.list) {
            const timezone = forecastWeather.city.timezone;
            const now = moment().utcOffset(timezone / 60);
            const next24Hours = forecastWeather.list.filter(entry => {
                const entryTime = moment.utc(entry.dt_txt).utcOffset(timezone / 60);
                return entryTime.isAfter(now) && entryTime.isBefore(now.clone().add(24, 'hours'));
            }).map(entry => ({
                time: moment.utc(entry.dt_txt).utcOffset(timezone / 60).format('HH:mm'),
                temperature: Math.round(entry.main.temp),
                weather: entry.weather[0].description
            }));

            setForecastData(next24Hours);
        }
    }, [forecastWeather]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { time, temperature, weather } = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p>{`Time: ${time}`}</p>
                    <p>{`Temperature: ${temperature}°C`}</p>
                    <div>{getWeatherIcon(weather, { width: 48, height: 48 })}</div>
                </div>
            );
        }

        return null;
    };

    const renderIcons = (props) => {
        const { data } = props;
        const iconSize = 30;
        const hight = -20;
        const padding = 95;
        const startX = 88;
        const highestTemperature = Math.max(...forecastData.map(entry => entry.temperature));
        const startY = highestTemperature + hight;

        return data.map((entry, index) => {
            const x = startX + index * (iconSize + padding);
            const y = startY;

            return (
                <foreignObject key={index} x={x} y={y} width={iconSize} height={iconSize}>
                    {getWeatherIcon(entry.weather, { width: iconSize, height: iconSize })}
                </foreignObject>
            );
        });
    };

    const formatTick = (tick) => {
        const [hour] = tick.split(':');
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour} ${suffix}`;
    };

    return (
        <div className='sm:p-6 mb-[65px] sm:mb-6'>
            <h2 className="text-xl font-bold mb-4 ">24-Hour Temperature Forecast</h2>
            {forecastData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320} style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", borderRadius: "15px", border: "1px solid", marginTop: "20px" }} >
                    <AreaChart data={forecastData} background="gray">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" padding={{ left: 30, right: 30 }} tickFormatter={formatTick} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="temperature" stroke="red" fill='#99c9d5' activeDot={{ r: 8 }} />
                        <Customized component={props => renderIcons({ ...props, data: forecastData })} />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ForecastChart;
