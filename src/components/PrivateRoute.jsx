import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";
import {useAuthStatus} from "./hooks/useAuthStatus";

export default function PrivateRoute() {
    const {loggedin,checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return <Spinner/>
    }
  return loggedin ? <Outlet/>: <Navigate to={'/sign-in'} />

}
