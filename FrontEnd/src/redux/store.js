import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/AuthSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})