import {createSlice} from '@reduxjs/toolkit'




export interface ImageData {
  id: string;
  image: string;
  title: string;
  uploaded_by: {
    username: string;
  };
  likes: number;
}

export interface ImageWithLike extends ImageData {
  isLiked: boolean;
}
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