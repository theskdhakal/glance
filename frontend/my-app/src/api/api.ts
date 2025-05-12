import axios from "axios"


const baseURL= "http://127.0.0.1:8000/"



export const RegistrationHandler=async(obj)=>{
    try {
        const response=await axios.post(baseURL +"core/register/",obj)

        console.log(response)
        return response.data
        
    } catch (error) {
        return{
            status:"error",
            message:error.message
        }
    }
}
