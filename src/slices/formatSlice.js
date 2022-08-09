import { createSlice } from "@reduxjs/toolkit"


 const initialState = {
    city:'Kyiv',
    format: 'metric',
    coords: null
}

export const format = createSlice({
    name:'format',
    initialState,
    reducers:{
        setImperial(state){
            state.format='imperial'
        },
        setMetric(state){
            state.format='metric'
        },
        setCity(state, action){
            state.city = action.payload
        },
        setCoords(state, action){
            state.coords = action.payload
        }
    }
})

export default format.reducer