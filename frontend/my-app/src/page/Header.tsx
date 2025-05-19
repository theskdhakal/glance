import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../components/userSlice";

export const Header = () => {
  const dispatch=useAppDispatch()

  const {user}=useAppSelector((state)=>state.user)

  const handleOnLogout=()=>{
    dispatch(setUser(""))
  }

  return (
    <nav className="bg-blue-200 py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
        
          <div className="text-xl font-bold text-blue-800">
            <Link to="/">Glance</Link>
          </div>
          
          {user ? (
             <div className="space-x-4">
             
             <button onClick={handleOnLogout}
               className="text-blue-900 hover:text-white px-3 py-2 rounded-md bg-green-100 hover:bg-green-300"
             >
              Logout
             </button>
           </div>
          ):(

<div className="space-x-4">
            <Link
              to="/login"
              className="text-blue-900 hover:text-white px-3 py-2 rounded-md bg-green-100 hover:bg-green-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-900 hover:text-white px-3 py-2 rounded-md bg-green-100 hover:bg-green-300"
            >
              Register 
            </Link>
          </div>
          )}


          {/* Navigation Links */}
         
        </div>
      </div>
    </nav>
  );
};
