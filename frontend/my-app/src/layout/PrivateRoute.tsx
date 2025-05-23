import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks"
import { useEffect } from "react";
import toast from "react-hot-toast"

export const PrivateRoute=()=>{
    const {user}=useAppSelector((state)=>state.user)

     useEffect(() => {
    if (!user) {
      toast.error("Please log in to access this page");
    }
  }, [user]);


    if(!user){
       
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}