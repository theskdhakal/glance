import axios from "axios"
import type { RegistrationData } from "../components/RegistrationForm"
import type { LoginData } from "../components/LoginForm"
import type { uploadData } from "../page/Upload"


const baseURL= "http://127.0.0.1:8000/"



export const RegistrationHandler=async(obj:RegistrationData)=>{
    try {
        const response=await axios.post(baseURL +"core/register/",obj)

        console.log(response)
        return response.data
        
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

        console.log(response)
        return response
        
    } catch (error) {
        return{
            status:"error",
            message:error
        }
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