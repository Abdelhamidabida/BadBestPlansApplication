import  Menu  from "../components/accueil/AccueilUser"
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoutes = () => {
    let token=localStorage.getItem("CC_Token");
    // console.log("token est " + token)
    return(
    token!=null ? <><Menu/><Outlet/></>: <Navigate to="/connexion"/>
    )
    }
    export default ProtectedRoutes

