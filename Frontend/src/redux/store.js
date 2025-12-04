
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice';
import feedSlice from './slices/feedSlice';
import requestSlice from './slices/requestSlice';

const store = configureStore({
    reducer : {
       auth : authSlice.reducer,
       feed : feedSlice.reducer,
       request : requestSlice.reducer,
    }
})

export default store;
