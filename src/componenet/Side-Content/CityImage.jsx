import React, { useEffect, useState } from 'react';


const UNSPLASH_ACCESS_KEY = 'o6Snjwyu8Vs6xoUjeJh5MTYDveg2tWBkfHAApxIkWD8';

const CityImage = ({ city }) => {
    const [cityImage, setCityImage] = useState('');
    const imageCity = city.charAt(0).toUpperCase() + city.slice(1)

    useEffect(() => {
        if (city) {
            fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        setCityImage(data.results[0].urls.small);
                    }
                })
                .catch(error => console.error('Error fetching city image:', error));
        }
    }, [city]);

    return (
        <div className="relative mt-5 text-center sm:p-3">
            {cityImage ? (
                <>
                    <img src={cityImage} alt={city} className="w-[340px] h-[300px] sm:w-full sm:bg-cover bg-canter bg-cover" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-shadow opacity-70">{imageCity}</div>
                </>
            ) : (
                <p>No image available for {imageCity}</p>
            )}
        </div>
    );
};

export default CityImage;
