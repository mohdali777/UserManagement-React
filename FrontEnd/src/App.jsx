import React, { useEffect } from 'react'
import { Routes,Route,  } from 'react-router-dom'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Profile from './pages/profile/profile'
import UserManagement from './pages/admin/user'
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoutes from './Routes/publicRoutes'
import { ToastContainer} from 'react-toastify';
import AdminRoutes from './Routes/adminRoutes'
import { useDispatch } from 'react-redux'
import { VerifyUser } from './redux/Slices/AuthSlice';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function App() {
  const User = useSelector((state)=> state.auth.user)
   const dispatch = useDispatch()
    useEffect(()=>{
  dispatch(VerifyUser())
    },[dispatch])
  return(
    <>
    <ToastContainer theme='dark' />
    <Routes>
      <Route path='/login' element={<PublicRoutes> <Login/> </PublicRoutes>}/>
      <Route path='/' element={<PrivateRoute><Home/></PrivateRoute> } />
      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute> } />
      <Route path='/admin' element={<AdminRoutes><UserManagement/></AdminRoutes> } />
      <Route path='/error' element={<h1>Error</h1>} />
    </Routes>
    </>
  )
  
}

export default App
