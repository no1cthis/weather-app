import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { weatherAPI } from "../services/weatherAPI";
import { format } from "../slices/formatSlice";


export const useGeo = () =>{
    const [location, setLocation] = useState({
        loaded: false,
        coords: {
            lat: 0,
            lon: 0
        }
    })

    const onSuccess = (location) =>{
        setLocation({
            loaded: true,
            coords:{
                lat: location.coords.latitude,
                lon: location.coords.longitude
            },
            error: ''
        })
    };

    const onError = (error) =>{
             setLocation({
                loaded: true,
                error
             })
    }

    useEffect(()=>{
        if(!('geolocation' in navigator)){
            onError({
                loaded: true,
                error: 'Geolocation not available'
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])


    return location
}

export const useGetCityByLocation = () => {
    
    const dispatch = useDispatch()
    const {setCity} = format.actions
   
    const geo = useGeo()
    if(!('geolocation' in navigator)){
        return
     }
         const {data, isLoading, error} = weatherAPI.useGetWeatherByGeoQuery(geo.coords)
         if(!isLoading && !error)
          dispatch(setCity(data.name))
  
}