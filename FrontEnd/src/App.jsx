import React, { } from 'react'
import { Routes,Route,  } from 'react-router-dom'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Profile from './pages/profile/profile'
import UserManagement from './pages/admin/user'
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoutes from './Routes/publicRoutes'

function App() {
  return(
    <Routes>
      < Route path='/login' element={<PublicRoutes> <Login/> </PublicRoutes> } />
      <Route path='/' element={<PrivateRoute><Home/></PrivateRoute> } />
      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute> } />
      <Route path='/admin' element={<UserManagement/>} />
    </Routes>
  )
  
}

export default App
