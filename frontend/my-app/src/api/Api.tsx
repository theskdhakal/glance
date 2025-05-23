
import type { RegistrationData } from "../components/RegistrationForm"
import type { LoginData } from "../components/LoginForm"
// import type { uploadData } from "../page/Upload"
import axios, { type AxiosResponse } from "axios"
import toast from "react-hot-toast"


const baseURL= import.meta.env.VITE_BACKEND_URL


const tokenStorage=(response:AxiosResponse)=>{

    const {access, refresh}=response.data;

  //store the tokens directly in local storage
  localStorage.setItem("access_token",access);
  localStorage.setItem("refresh_token",refresh)
}

const getAuthHeader=():{headers:{Authorization:string}} | null=>{
     const token= localStorage.getItem("access_token")
     
        if (!token) {
            toast.error("Please sign in")
            return null
        }

        return{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
 
}



export const RegistrationHandler=async(obj:RegistrationData)=>{
    try {
      
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
  const config=getAuthHeader()
  if(!config ) return null

    try {
        const res= await axios.get(baseURL+'core/login/',config)

        return res.data
        
    } catch (error) {
        console.error("failed to fetch user", error);
        return null
    }
}


export const uploadHandler=async(obj:FormData)=>{
    try {
    const config=getAuthHeader()
    if(!config ) return null

        const response=await axios.post(baseURL + "core/images/",obj,config)

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
        
        const config=getAuthHeader()
        if(!config ) return null

        const response=await axios.post(baseURL +
            `core/images/${imageId}/like/`,{},config
        )
        


        return response
        
    } catch (error) {
        console.error('Error toggling like',error);
    }
}