import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/AuthSlice'
import iconReducer from './Slices/iconReducer'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        icon:iconReducer
    }
})