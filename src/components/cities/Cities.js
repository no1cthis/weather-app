import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from '../../slices/formatSlice';
import cl from './cities.module.scss'

function Cities() {
    const cities = ['London','Shanghai','Istanbul','Tokyo','Kyiv']
    const {setCity} = format.actions
    const dispatch = useDispatch()
    return ( 
        <div className={cl.cities}>
            {cities.map(city => <div key={city} name={city} className={cl.city} onClick={(e) => dispatch(setCity(e.target.innerHTML))}>{city}</div>)}
        </div>
     );
}

export default Cities;