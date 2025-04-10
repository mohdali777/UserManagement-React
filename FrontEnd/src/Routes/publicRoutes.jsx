import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({children})=>{
const user = useSelector((state)=>state.auth.user)
console.log(user);

return user ? <Navigate to={'/'}/> : children
}

export default PublicRoutes