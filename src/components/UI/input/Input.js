import React, {useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { useDispatch } from 'react-redux';
import { format } from '../../../slices/formatSlice';
import { useGeo } from '../../../hooks/useGeoLocation';
import { weatherAPI } from '../../../services/weatherAPI';

import cl from './input.module.scss'

function Input({placeholder}) {
    const [input, setInput] = useState('');
    const {setMetric, setImperial, setCity} = format.actions
    const geo = useGeo()
    const {data, isLoading} = weatherAPI.useGetWeatherByGeoQuery(geo.coords)
    const dispatch = useDispatch();

    



    const changeCity = () => {
            dispatch(setCity(input))
    }

    return ( 
        <div className={cl.wrapper}>
            <div className={cl.input__wrapper}>
                    <input className={cl.input} 
                    type="text" 
                    placeholder =   {placeholder} 
                    value       =   {input} 
                    onChange    =   {(e) => setInput(e.target.value)}
                    onKeyDown   =   {(e) => {
                                            if(e.key==='Enter')
                                                changeCity()
                                        }}
                    />

                    <div className={cl.icons}>
                        <UilSearch          size='30' className = {cl.icon} onClick={changeCity}/>
                        <UilLocationPoint   size='30' className = {cl.icon} onClick={()=>dispatch(setCity(data.name))}/>
                    </div>
            </div>
                

                <div className={cl['temperature-chooses']}>
                        <div className={cl['temperature-choose']} onClick = {() => dispatch(setMetric())}>°С</div> 
                        <div className={cl.separator}>|</div>
                        <div className={cl['temperature-choose']} onClick = {() => dispatch(setImperial())}>K</div>
                </div>
              
        </div>
     );
}

export default Input;