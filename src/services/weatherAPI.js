import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const _APIKey = 'cebf8ffd937b2118231c6aa03d71ea34'
// url: `weather?lat=35&lon=139&appid=${_APIKey}`
export const weatherAPI = createApi({
    reducerPath: 'wetherAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.openweathermap.org/data/2.5/'}),
    endpoints: (builder) => ({
        getWeather: builder.query({
            query: ({city, format}) => ({
                url: `weather`,
                params:{
                    q: city,
                    appid: _APIKey,
                    units: format,
                }
            }),
        }),
        getWeatherByGeo: builder.query({
            query: ({lon, lat}) => ({
                url: `weather`,
                params:{
                    lat, lon, appid:_APIKey
                }
            })
        })
    })
})
