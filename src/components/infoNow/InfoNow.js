import React, { useState } from 'react';
import { UilSun, UilSunset, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons'
import {DateTime} from 'luxon';
import { weatherAPI } from '../../services/weatherAPI';
import { useSelector } from 'react-redux';

import cl from './infoNow.module.scss'

function InfoNow() {
    const {city, format} = useSelector((state => state.formatReducer))
    const char = format === 'metric' ? '°С' : 'K'            //°С
    const {data: weather, isLoading, error, refetch} = weatherAPI.useGetWeatherQuery({city, format})

    

    useState(()=>{
        refetch()
    }, [format])
    const sunriseTime = weather ? DateTime.fromSeconds(weather.sys.sunrise).toFormat('hh:mm a') : null
    const sunsetTime = weather ? DateTime.fromSeconds(weather.sys.sunset).toFormat('hh:mm a') : null
    
    if(isLoading)
        return (<div className={cl.container} style={{fontSize:'48px'}}>Loading...</div>)

    if(error)
        return

    return ( 
    <div className={cl.container}>  
        <div className={cl.city}> {isLoading ? 'LOADING...' : weather.name}</div>
        <div className={cl.clouds}> {isLoading ? null : weather.weather[0].main}</div>
        <div className={cl.info}>
            <img className={cl.icon} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <div className={cl.temperature}>{isLoading ? null : weather.main.temp} {char}</div>
            <ul className={cl.details}>
                <li className={cl.feel}> Fells like: <span className={cl.bold}>{isLoading ? null: weather.main.feels_like} {char}</span></li>
                <li className={cl.humidity}> Humidity: <span className={cl.bold}>{isLoading ? null: weather.main.humidity}%</span></li>
                <li className={cl.wind}> Wind speed: <span className={cl.bold}>{isLoading ? null: weather.wind.speed}</span> {format === 'metric' ? 'meter/sec' : 'miles/hour'}</li>
            </ul>
        </div>
        <div className={cl.detailsLine}>
                <UilSun className={cl.icon}/>
                Rise <span className={cl.bold}>{sunriseTime}</span>
                <div className={cl.separator}></div>
                <UilSunset className={cl.icon}/>
                 Set <span className={cl.bold}>{sunsetTime}</span>
                <div className={cl.separator}></div>
                <UilArrowUp className={cl.icon}/>
                High <span className={cl.bold}>{isLoading ? null: weather.main.temp_max} {char}</span>
                <div className={cl.separator}></div>
                <UilArrowDown className={cl.icon}/>
                Low <span className={cl.bold}>{isLoading ? null: weather.main.temp_min} {char}</span>
        </div>

    </div>
     );
}

export default InfoNow;