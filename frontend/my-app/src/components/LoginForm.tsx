import { useState } from "react";
import api from "../api/api";



interface LoginData{
    username:string;
    password:string;

}

const LoginForm=()=>{
    const [formData,setFormData]=useState<LoginData>({username:'',password:''})
    const [error,setError]=useState<string | null>(null)


    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

     
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()

        try {
            const response=await api.post('/core/token',formData)
            console.log('login successful', response.data)
            
        } catch (error) {
            console.error('login failed:',error)
            setError('invalid credentials')
        }
    }





return(
    <div className="w-full max-w-sm mx-auto p-6 border border-gray-300 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
    </form>
  </div>
)




}

export default LoginForm