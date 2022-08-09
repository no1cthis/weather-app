import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { weatherAPI } from '../../../services/weatherAPI';
import { useSelector } from 'react-redux';

import cl from './localDate.module.scss'

function LocalDate() {
    const {city} = useSelector(state => state.formatReducer)
    const {data, isLoading, error} = weatherAPI.useGetWeatherQuery({city})
    const [time, setTime] = useState() 

    useEffect(()=>{
        const date = isLoading ? null : DateTime.now().setZone(data.timezone/60).toFormat('cccc, dd MMMM hh:mm:ss a')
             setTime(date)
       const intervalID =  setInterval(()=>{
            const date = DateTime.now().setZone(data.timezone/60).toFormat('cccc, dd MMMM hh:mm:ss a')
             setTime(date)
            
        }, 1000)
        return ()=>{
            clearInterval(intervalID)
        }
    },[data])

    if(error)
        return (<div className={cl.error}>
                    {error.data.message}
                </div>)
    return ( 
    <div className={cl.container}>
            {isLoading ? null : <div className={cl.time}>{time}</div>}
    </div>
     );
}

export default LocalDate;