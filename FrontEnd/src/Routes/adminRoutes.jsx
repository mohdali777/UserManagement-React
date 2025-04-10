import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate} from "react-router-dom"
import { VerifyUser } from "../redux/Slices/AuthSlice"


 const AdminRoutes = ({children})=>{
    const dispatch = useDispatch()
        useEffect(()=>{
      dispatch(VerifyUser())
        },[dispatch])
      const user = useSelector((state)=> state.auth.user)
      if(user === undefined){
        return 
      }
      return user && user.isAdmin === true ? children : <Navigate to={'/login'} />
    }

export default AdminRoutes