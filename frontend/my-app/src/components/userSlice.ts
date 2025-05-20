import {createSlice} from '@reduxjs/toolkit'

interface User{
    id:number;
    username:string;
    email:string
}

interface UserState {
    user: User | null;
}



const initialState: UserState={
    user:null
}


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
})


const {reducer, actions}=userSlice;

export const {setUser}=actions;

export default reducer