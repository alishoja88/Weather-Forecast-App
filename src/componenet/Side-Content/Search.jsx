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

// src/componenet/Side-Content/Search.jsx




// import React, { useCallback, useState } from 'react';
// import { useCity } from '../../ContextData/CityContext';
// import { searchCities } from '../Service/GeoDbService';
// import debounce from 'lodash.debounce';

// const Search = () => {
//     const [inputValue, setInputValue] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const { handleCityChange } = useCity();
//     const [loading, setLoading] = useState(false);

//     const debouncedSearchCities = useCallback(debounce(async (query) => {
//         setLoading(true);
//         try {
//             const results = await searchCities(query);
//             setSuggestions(results);
//         } catch (error) {
//             console.error('Error fetching city data:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, 500), []); // Debounce delay set to 500ms

//     const handleChange = (e) => {
//         setInputValue(e.target.value);
//         if (e.target.value.trim()) {
//             debouncedSearchCities(e.target.value);
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSelect = (city) => {
//         setInputValue(city.name);
//         setSuggestions([]);
//         handleCityChange(city.name);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (inputValue.trim()) {
//             handleCityChange(inputValue);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='w-[80%] mb-5 h-[40px]'>
//             <input
//                 className='w-[100%] p-[5px] h-[100%] outline-none bg-inherit border-b border-b-black'
//                 type="text"
//                 value={inputValue}
//                 onChange={handleChange}
//                 placeholder='City Name'
//             />
//             {loading && <div>Loading...</div>}
//             <div className="autocomplete-dropdown-container">
//                 {suggestions.map((suggestion) => (
//                     <div
//                         key={suggestion.id}
//                         className='suggestion-item cursor-pointer	'
//                         onMouseDown={() => handleSelect(suggestion)} // Chanyge onClick to onMouseDown
//                     >
//                         {suggestion.name}
//                     </div>
//                 ))}
//             </div>
//         </form>
//     );
// };

// export default Search;