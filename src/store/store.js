import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import formatReducer from '../slices/formatSlice'
import { weatherAPI } from "../services/weatherAPI";



const rootReducer = combineReducers({
    [weatherAPI.reducerPath]: weatherAPI.reducer,
    formatReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherAPI.middleware)
})