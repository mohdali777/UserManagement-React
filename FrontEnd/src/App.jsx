import React, { } from 'react'
import { Routes,Route,  } from 'react-router-dom'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Profile from './pages/profile/profile'
import UserManagement from './pages/admin/user'

function App() {
  return(
    <Routes>
      < Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/admin' element={<UserManagement/>} />
    </Routes>
  )
  
}

export default App
