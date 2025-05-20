
import type { RegistrationData } from "../components/RegistrationForm"
import type { LoginData } from "../components/LoginForm"
import type { uploadData } from "../page/Upload"
import axios, { type AxiosResponse } from "axios"


const baseURL= "http://127.0.0.1:8000/"


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


export const uploadHandler=async(obj:uploadData)=>{
    try {
        const response=await axios.post(baseURL + "images/",obj)
        return response
        
    } catch (error) {
        return{
            status:"error",
            message:error
        }
    }
}