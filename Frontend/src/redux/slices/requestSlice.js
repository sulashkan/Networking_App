import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name : 'request',
    initialState : [],
    reducers :{
        interestedRequest : (state, action) => { 
            console.log("action" , action.payload)
            return action.payload;
        },
        acceptRequest : (action) => { return action.payload},
        rejectRequest : (action) => { return action.payload},
        friendList : () => {}
    }
})

export const requestActions = requestSlice.actions;
export default requestSlice;