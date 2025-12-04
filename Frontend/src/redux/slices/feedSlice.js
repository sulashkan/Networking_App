import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : 'feed',
    initialState : [],
    reducers : {
        feedData : (state , action) => {
            console.log("feed action" , action.payload)
            return action.payload;
            // state.push(action.payload)
        },
        removeUser : (state , action) => {
          return  state.filter( user => user._id !== action.payload);
        }

    }
})

export const feedActions = feedSlice.actions;

export default feedSlice;