
import type { RegistrationData } from "../components/RegistrationForm"
import type { LoginData } from "../components/LoginForm"
// import type { uploadData } from "../page/Upload"
import axios, { type AxiosResponse } from "axios"


const baseURL= process.env.URL


const tokenStorage=(response:AxiosResponse)=>{

    const {access, refresh}=response.data;

  //store the tokens directly in local storage
  localStorage.setItem("access_token",access);
  localStorage.setItem("refresh_token",refresh)
}



export const RegistrationHandler=async(obj:RegistrationData)=>{
    try {
        console.log('user obj :', obj)
        const response=await axios.post(baseURL +"core/register/",obj)
        
       tokenStorage(response)
       return{
        status:'success'
       }
        
    } catch (error) {
        return{
            status:"error",
            message:error
        }
    }
}

export const LoginHandler=async(obj:LoginData)=>{
    try {
        const response=await axios.post(baseURL +"core/token/",obj)
        

        tokenStorage(response)
  
  return {status:"success"}
  
        
    } catch (error) {
        return{
            status:"error",
            message:error
        }
    }
}

export const getUser=async()=>{
    const token=localStorage.getItem("access_token")

    if(!token) return null;

    try {
        const res= await axios.get(baseURL+'core/login/',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return res.data
        
    } catch (error) {
        console.error("failed to fetch user", error);
        return null
    }
}


export const uploadHandler=async(obj:FormData)=>{
    try {
    const token=localStorage.getItem("access_token")

    if (!token) return null !

        const response=await axios.post(baseURL + "core/images/",obj,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        console.log(response)
        return response
        
    } catch (error) {
        return{
            status:"error",
            message:error
        }
    }
}

export const getImages=async()=>{
    try {

        const response=await axios.get(baseURL + "core/images/")
        console.log(response)
        return response.data
        
    } catch (error) {
        return{
            status:"error",
            message:error
        }
    }
}

export const toggleLike=async(imageId:string)=>{
    try {
        const token=localStorage.getItem("access_token")
        console.log(token)
        if (!token)return null

        const response=await axios.post(baseURL +
            `core/images/${imageId}/like/`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        


        return response
        
    } catch (error) {
        console.error('Error toggling like',error);
    }
}