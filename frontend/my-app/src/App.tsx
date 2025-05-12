// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-500 text-white p-4 flex justify-center align-center">
        <LoginForm/>
        <RegistrationForm/>
      </div>
    </>
  )
}

export default App
