import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : [],
    reducers : {
        userInfo : (state , action) => {
            console.log("action" , action.payload)
            return action.payload;
        }
    }
    
})

export const authActions = authSlice.actions;

export default authSlice;