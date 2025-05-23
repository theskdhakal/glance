import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./src/components/userSlice"
import imageReducer from "./src/components/imageSlice"



export const store=configureStore({
    reducer:{
        user:userReducer,
        images:imageReducer
    },
    devTools:true

})


export type RootState= ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch