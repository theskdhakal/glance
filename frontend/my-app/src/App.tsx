
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Home from './page/Home'
import Upload from './page/Upload'
import  { Toaster } from 'react-hot-toast';
import { PrivateRoute } from './layout/PrivateRoute'



function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/upload" element={<Upload/>}/>
        </Route>

        <Route path="/register" element={<RegistrationForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>

       
      </Routes>
      <Toaster/>
    </>

  )
}

export default App
