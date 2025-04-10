import { createSlice } from "@reduxjs/toolkit";


const IconSlice = createSlice({
    name:'icon',
    initialState:{
        iconState:null
    },
    reducers:{
        changeStateHome:(state)=>{
         state.iconState = 'Home'
        },
        changeStateprofile:(state)=>{
            state.iconState = 'profile'
        },
        changeStateAdmin:(state)=>{
            state.iconState = 'Admin'
        }
    }
})

export default IconSlice.reducer
export const {changeStateAdmin,changeStateHome,changeStateprofile} = IconSlice.actions