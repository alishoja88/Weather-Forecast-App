import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useWeather } from '../../ContextData/context';

const containerStyle = {
    width: '100%',
    height: '250px'
};

const MapComponent = () => {
    const { initialLoading, currentWeather, loading } = useWeather();

    if (initialLoading || loading) {
        return <div>Loading map...</div>;
    }

    if (!currentWeather || !currentWeather.coord) {
        return <div>No map data available</div>;
    }

    const center = {
        lat: currentWeather.coord.lat,
        lng: currentWeather.coord.lon
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
        </GoogleMap>
    );
};

const MapWithScript = () => (
    <div className="relative w-full h-64 mt-4 sm:p-3 sm:mb-3">
        <LoadScript googleMapsApiKey="AIzaSyAkItyobZG0A2DLeNB3kp93ea8qwkupDfI">
            <MapComponent />
        </LoadScript>
    </div>

);

export default React.memo(MapWithScript);
