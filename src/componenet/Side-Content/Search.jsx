import React, { useState } from 'react';
import { useCity } from '../../ContextData/CityContext';
import { useWeather } from '../../ContextData/context';

const Search = () => {
    const [inputValue, setInputValue] = useState("");
    const { error, setIsSearchTriggered } = useWeather();
    const { handleCityChange } = useCity()

    const handelChange = (e) => {
        setInputValue(e.target.value)

    }
    const handelSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleCityChange(inputValue);
            setIsSearchTriggered(true);
        }
    }
    return (
        <div className='w-[100%] mb-5 sm:w-[100%] md:w-[100%] '>
            <form onSubmit={handelSubmit} className='w-[90%] mb-5 h-[40px] bg-slate-100 rounded-md text-lg font-medium  sm:w-[80%] sm:m-auto md:w-[70%] md:m-auto'>
                <input
                    className='w-[100%] p-[10px] h-[100%] outline-none bg-inherit rounded-md'
                    type="text"
                    value={inputValue}
                    onChange={handelChange}
                    placeholder='City Name'
                />
            </form>
            {error && <div className="text-orange-600 mt-2">Please try again with correct city name !!!</div>}

        </div>
    )
}

export default Search;