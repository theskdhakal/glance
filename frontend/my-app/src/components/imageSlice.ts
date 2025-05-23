import {createSlice} from '@reduxjs/toolkit'
import type { ImageWithLike } from '../page/Home'


// interface Image[]{
//     id:number;
//     username:string;
//     email:string
// }

interface ImageState {
   images:ImageWithLike[]
}



const initialState: ImageState={
    images:[]
}


const imageSlice=createSlice({
    name:'images',
    initialState,
    reducers:{
        setImages:(state,action)=>{
            state.images=action.payload
        },

        updatedLikeStatus:(state, action)=>{
    const {id, isLiked,likes}=action.payload;
    const image =state.images.find(img=>img.id===id)
    if(image){
        image.isLiked=isLiked;
        image.likes =likes
    }
        }
    }
})


const {reducer, actions}=imageSlice;

export const {setImages,updatedLikeStatus}=actions;

export default reducer